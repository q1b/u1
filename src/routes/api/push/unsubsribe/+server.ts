import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { repo } from 'remult';
import { PushSubscription } from '$lib/shared/User/PushSubscription';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		error(401, 'Unauthorized');
	}

	const subscription = await request.json();
	await repo(PushSubscription).deleteMany({
		where: {
			$and: [{ endpoint: subscription.endpoint }, { userId: locals.user.id }]
		}
	});

	return json({ status: 'success' });
};
