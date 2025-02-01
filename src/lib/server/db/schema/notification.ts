import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { userTable } from './user';
import { createdAt, id } from '../utils';
import { relations } from 'drizzle-orm';

export const notificationTable = sqliteTable('notification', {
	id,
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	status: text('status'),
	title: text('title'),
	body: text('content'),
	createdAt
});

export const notificationRelations = relations(notificationTable, ({ one }) => ({
	user: one(userTable, {
		fields: [notificationTable.userId],
		references: [userTable.id]
	})
}))

export type Notification = typeof notificationTable.$inferSelect;
