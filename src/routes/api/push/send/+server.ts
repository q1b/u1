import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { webPush } from '$lib/server/webpush';
import { repo } from 'remult';
import { Notification } from '$lib/shared/User/Notification';
import { PushSubscription } from '$lib/shared/User/PushSubscription';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		error(401, 'Unauthorized');
	}

	const { title, body }: { title: string; body: string } = await request.json();

	await repo(Notification).upsert({
		where: {
			userId: locals.user.id
		},
		set: {
			title,
			body
		}
	});

	const subscriptions = await repo(PushSubscription).find({
		where: {
			userId: locals.user.id
		}
	});

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
		// The PushSubscription you wish to send the notification to.
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
