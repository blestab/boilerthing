import { pgTable, uniqueIndex, pgEnum, text, boolean, timestamp, foreignKey, integer } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const UserRole = pgEnum("UserRole", ['ADMIN', 'USER'])


export const User = pgTable("User", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email"),
	image: text("image"),
	emailVerified: boolean("emailVerified").default(false),
	role: UserRole("role").default('USER').notNull(),
	createdAt: timestamp("createdAt", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		email_key: uniqueIndex("User_email_key").using("btree", table.email),
	}
});

export const Account = pgTable("Account", {
	id: text("id").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => User.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refresh_token: text("refresh_token"),
	access_token: text("access_token"),
	expires_at: integer("expires_at"),
	token_type: text("token_type"),
	scope: text("scope"),
	id_token: text("id_token"),
	session_state: text("session_state"),
},
(table) => {
	return {
		provider_providerAccountId_key: uniqueIndex("Account_provider_providerAccountId_key").using("btree", table.provider, table.providerAccountId),
	}
});