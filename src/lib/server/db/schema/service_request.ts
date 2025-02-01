import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createdAt, id } from '../utils';
import { relations } from 'drizzle-orm';
import { userTable } from './user';
import { serviceProviderTable } from './service_provider';

export const serviceRequestTable = sqliteTable('service_request', {
	id,
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	serviceProviderId: text('service_provider_id')
		.notNull()
		.references(() => serviceProviderTable.id, { onDelete: 'no action' }),
	status: text('status', { enum: ['pending', 'accepted', 'rejected'] }).default('pending'),
	createdAt
})

export const serviceRequestRelations = relations(serviceRequestTable, ({ one }) => ({
	user: one(userTable, {
		fields: [serviceRequestTable.userId],
		references: [userTable.id]
	}),
	serviceProvider: one(serviceProviderTable, {
		fields: [serviceRequestTable.serviceProviderId],
		references: [serviceProviderTable.id]
	})
}))

export type ServiceRequest = typeof serviceRequestTable.$inferSelect;
