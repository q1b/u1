import { error, json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { subscriptionTable } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';
import { and, eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		error(401, 'Unauthorized');
	}

	const subscription = await request.json();

	await db
		.delete(subscriptionTable)
		.where(
			and(
				eq(subscriptionTable.endpoint, subscription.endpoint),
				eq(subscriptionTable.userId, locals.user.id)
			)
		);

	return json({ status: 'success' });
};
