import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { userTable } from './user';
import { createdAt, id } from '../utils';

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

export type Notification = typeof notificationTable.$inferSelect;
