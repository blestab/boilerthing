import { relations } from "drizzle-orm/relations";
import { User, Account } from "./schema";

export const AccountRelations = relations(Account, ({one}) => ({
	User: one(User, {
		fields: [Account.userId],
		references: [User.id]
	}),
}));

export const UserRelations = relations(User, ({many}) => ({
	Accounts: many(Account),
}));