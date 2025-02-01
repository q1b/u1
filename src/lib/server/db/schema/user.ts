import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createdAt, id } from '../utils';
import { relations } from 'drizzle-orm';
import { sessionTable } from './session';
import { notificationTable } from './notification';

export const userTable = sqliteTable('user', {
	id,
	googleId: text('google_id'),
	name: text('name'),
	createdAt
});

export const userRelations = relations(userTable, ({ many }) => ({
	sessions: many(sessionTable),
	notifications: many(notificationTable)
}))

export type User = typeof userTable.$inferSelect;
