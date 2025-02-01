import { error, json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { subscriptionTable } from '$lib/server/db/schema';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		error(401, 'Unauthorized');
	}

	const subscription = await request.json();
	await db.insert(subscriptionTable).values({
		userId: locals.user.id,
		endpoint: subscription.endpoint,
		p256dh: subscription.keys.p256dh,
		auth: subscription.keys.auth
	});

	return json({ status: 'success' });
};
