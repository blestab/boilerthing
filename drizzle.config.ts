import "dotenv/config"
import { defineConfig } from "drizzle-kit"
import { parse } from "pg-connection-string"

const dbUrl = process.env.DATABASE_URL!
const dbConfig = parse(dbUrl)

export default defineConfig({
  dialect: "postgresql",
  out: "./src/drizzle",
  schema: "./src/drizzle/schema.ts",
  dbCredentials: {
    host: dbConfig.host!,
    port: Number(dbConfig.port!),
    user: dbConfig.user!,
    password: dbConfig.password!,
    database: dbConfig.database!,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  },
  verbose: true,
  strict: true,
})
