import { integer, text } from 'drizzle-orm/sqlite-core';

export const id = text('id')
	.primaryKey()
	.$defaultFn(() => crypto.randomUUID());
export const createdAt = integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date());
