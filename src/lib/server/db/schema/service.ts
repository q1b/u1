import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createdAt, id } from "../utils";
import { serviceProviderTable } from "./service_provider"
import { relations } from "drizzle-orm";

export const serviceTable = sqliteTable('service', {
	id,
	name: text('name').notNull(),
	description: text('description'),
	createdAt
})

export const serviceRelations = relations(serviceTable, ({ one }) => ({
	providers: one(serviceProviderTable, {
		fields: [serviceTable.id],
		references: [serviceProviderTable.serviceId]
	})
}));
