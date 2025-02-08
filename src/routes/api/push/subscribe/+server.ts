import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { repo } from 'remult';
import { Subscription } from '$lib/shared/Subscription';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		error(401, 'Unauthorized');
	}

	const subscription = await request.json();

	await repo(Subscription).upsert({
		where: {
			userId: locals.user.id
		},
		set: {
			endpoint: subscription.endpoint,
			p256dh: subscription.keys.p256dh,
			auth: subscription.keys.auth
		}
	});

	return json({ status: 'success' });
};
