import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createdAt, id } from '../utils';

export const userTable = sqliteTable('user', {
	id,
	googleId: text('google_id'),
	name: text('name'),
	createdAt
});

export type User = typeof userTable.$inferSelect;
