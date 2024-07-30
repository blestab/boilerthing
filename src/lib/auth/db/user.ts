import { eq } from "drizzle-orm"
import { db } from "@/drizzle/db"
import { User } from "@/drizzle/schema"

export async function getUserByEmail(email: string) {
  try {
    const user = await db
      .select()
      .from(User)
      .where(eq(User.email, email))
      .execute()
    return user
  } catch (error) {
    return null
  }
}

export async function getUserById(id: string) {
  try {
    const userWithAccount = await db
      .select()
      .from(User)
      .where(eq(User.id, id))
      .execute()
    return userWithAccount
  } catch (error) {
    return null
  }
}
