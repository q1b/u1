import { sqliteTable, text, } from "drizzle-orm/sqlite-core";
import { createdAt, id } from "../utils";
import { serviceTable } from "./service";
import { userTable } from "./user";
import { relations } from "drizzle-orm";

export const serviceProviderTable = sqliteTable('service_provider', {
	id,
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	serviceId: text('service_id')
		.notNull()
		.references(() => serviceTable.id, { onDelete: 'no action' }),
	createdAt
})

export const serviceProviderRelations = relations(serviceProviderTable, ({ one }) => ({
	user: one(userTable, {
		fields: [serviceProviderTable.userId],
		references: [userTable.id]
	}),
	service: one(serviceTable, {
		fields: [serviceProviderTable.serviceId],
		references: [serviceTable.id]
	})
}));

export type ServiceProvider = typeof serviceProviderTable.$inferSelect;
