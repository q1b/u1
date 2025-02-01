import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { notificationTable, subscriptionTable } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { webPush } from '$lib/server/webpush';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		error(401, 'Unauthorized');
	}
	const { title, body, userId } = await request.json();

	await db.insert(notificationTable).values({
		userId,
		title,
		body
	});

	const subscriptions = await db
		.select()
		.from(subscriptionTable)
		.where(eq(subscriptionTable.userId, userId));

	// Send push notification to all user's subscriptions
	const notifications = subscriptions.map((subscription) => {
		if (!subscription.auth || !subscription.p256dh || !subscription.endpoint) return;
		const pushSubscription = {
			endpoint: subscription.endpoint,
			keys: {
				p256dh: subscription.p256dh,
				auth: subscription.auth
			}
		};

		return webPush.sendNotification(
			pushSubscription,
			JSON.stringify({
				title,
				body
			})
		);
	});

	await Promise.all(notifications);

	return json({ status: 'success' });
};
