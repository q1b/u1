import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { userTable } from './user';
import { id } from '../utils';

export const sessionTable = sqliteTable('session', {
	id,
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export type Session = typeof sessionTable.$inferSelect;
