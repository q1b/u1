import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createdAt, id } from '../utils';
import { relations } from 'drizzle-orm';
import { sessionTable } from './session';
import { notificationTable } from './notification';
import { serviceProviderTable } from './service_provider';
import { serviceClientTable } from './service_client';
import { serviceRequestTable } from './service_request';
import { subscriptionTable } from './subscription';

export const userTable = sqliteTable('user', {
	id,
	googleId: text('google_id'),
	name: text('name'),
	createdAt
});

export const userRelations = relations(userTable, ({ many }) => ({
	sessions: many(sessionTable),
	subscriptions: many(subscriptionTable),
	notifications: many(notificationTable),
	serviceProviders: many(serviceProviderTable),
	serviceRequests: many(serviceRequestTable),
	serviceClient: many(serviceClientTable)
}));

export type User = typeof userTable.$inferSelect;
