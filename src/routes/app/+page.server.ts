import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) return redirect(302, '/');

	return {
		user: event.locals.user
	};
};

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.user) return redirect(302, '/');
		const formData = await event.request.formData();
		const date = formData.get('date');
		const time = formData.get('time');
		console.log(date, time, event.locals.user.id);
		return { type: 'success', status: 204, data: { message: 'Event created successfully' } };
	}
};
