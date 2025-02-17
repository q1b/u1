import { repo } from 'remult';
import { User } from '$lib/shared/User/User';
import { AuthSession } from '$lib/shared/User/AuthSession';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';

export const getUserFromGoogleId = async (googleId: string): Promise<User | null> => {
	return (await repo(User).findFirst({ googleId })) || null;
};

export const createUser = async (googleId: string, name: string): Promise<User> => {
	return await repo(User).insert({ googleId, name });
};

export const createSession = async (
	token: string,
	userId: string
): Promise<Omit<AuthSession, 'user'>> => {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

	const session = await repo(AuthSession).upsert({
		where: {
			userId
		},
		set: {
			id: sessionId,
			expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
		}
	});

	return {
		id: session.id,
		userId: session.userId,
		expiresAt: session.expiresAt
	};
};
