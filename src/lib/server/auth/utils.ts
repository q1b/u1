import { eq } from 'drizzle-orm';
import { db } from '../db';
import { userTable, type User } from '../db/schema/user';

export const getUserFromGoogleId = async (googleId: string): Promise<User | null> => {
	const res = await db.select().from(userTable).where(eq(userTable.googleId, googleId)).execute();
	if (res.length === 0) return null;
	return res[0];
};

export const createUser = async (googleId: string, name: string): Promise<User> => {
	const res = await db.insert(userTable).values({ googleId, name }).returning();
	return res[0];
};
