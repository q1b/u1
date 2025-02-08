import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { repo } from 'remult';
import { Subscription } from '$lib/shared/Subscription';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		error(401, 'Unauthorized');
	}

	const subscription = await request.json();
	await repo(Subscription).deleteMany({
		where: {
			$and: [{ endpoint: subscription.endpoint }, { userId: locals.user.id }]
		}
	});

	return json({ status: 'success' });
};
