import { remultSveltekit } from 'remult/remult-sveltekit';
import { SqlDatabase } from 'remult';
import { TursoDataProvider } from 'remult/remult-turso';
import { db } from './db';
import { User } from '$lib/shared/User';
import { Session } from '$lib/shared/Session';
import { Subscription } from '$lib/shared/Subscription';
import { Notification } from '$lib/shared/Notification';

export const api = remultSveltekit({
	entities: [User, Session, Subscription, Notification],
	dataProvider: new SqlDatabase(new TursoDataProvider(db)),
	getUser: async (event) => {
		const user = await event?.locals?.user;
		return user;
	},
	admin: true
});
