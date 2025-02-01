import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt, id } from "../utils";
import { userTable } from "./user";
import { serviceProviderTable } from "./service_provider";
import { relations } from "drizzle-orm";

export const serviceClientTable = sqliteTable('service_client', {
	id,
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	serviceProviderId: text('service_provider_id')
		.notNull()
		.references(() => serviceProviderTable.id, { onDelete: 'no action' }),
	createdAt
},
	// (t) => ({
	// 	pk: primaryKey({ columns: [t.userId, t.serviceProviderId] }),
	// })
)

export const serviceClientRelations = relations(serviceClientTable, ({ one }) => ({
	user: one(userTable, {
		fields: [serviceClientTable.userId],
		references: [userTable.id]
	}),
	serviceProvider: one(serviceProviderTable, {
		fields: [serviceClientTable.serviceProviderId],
		references: [serviceProviderTable.id]
	})
}));

export type ServiceClient = typeof serviceClientTable.$inferSelect;
