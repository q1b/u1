import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
	if (event.locals.user && event.url.pathname === '/')
		redirect(307, '/app')

	return { user: event.locals.user };
}
