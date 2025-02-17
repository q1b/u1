import { remultSveltekit } from 'remult/remult-sveltekit';
import { SqlDatabase } from 'remult';
import { TursoDataProvider } from 'remult/remult-turso';
import { db } from './db';
import { User } from '$lib/shared/User/User';
import { AuthSession } from '$lib/shared/User/AuthSession';
import { PushSubscription } from '$lib/shared/User/PushSubscription';
import { Notification } from '$lib/shared/User/Notification';

export const api = remultSveltekit({
	entities: [User, AuthSession, PushSubscription, Notification],
	dataProvider: new SqlDatabase(new TursoDataProvider(db)),
	getUser: async (event) => {
		const user = await event?.locals?.user;
		return user;
	},
	admin: true
});
