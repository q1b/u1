import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(),
	age: integer('age')
});
export const session = undefined('session', {});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
