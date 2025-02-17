import { db } from '../db';
import { encodeBase32, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';

import type { RequestEvent } from '@sveltejs/kit';
import type { MembersOnly } from 'remult';
import type { AuthSession } from '$lib/shared/User/AuthSession';
import type { User } from '$lib/shared/User/User';

export const sessionCookieName = 'auth-session';

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

	const res = await db.execute({
		sql: `
SELECT user_auth_session.id, user_auth_session.userId, user_auth_session.expiresAt, user.id, user.googleId, user.name FROM user_auth_session
INNER JOIN user ON user_auth_session.userId = user.id
WHERE user_auth_session.id = ?
`,
		args: [sessionId]
	});

	const row = res.rows.at(0) as SessionValidationResult['session'] &
		SessionValidationResult['user'];

	if (row === null || row === undefined) {
		return { session: null, user: null };
	}

	const session = {
		id: row.id as string,
		userId: row.userId as string,
		expiresAt: new Date((row.expiresAt as unknown as number) * 1000)
	};

	const user: Partial<MembersOnly<User>> = {
		id: row.userId as string,
		googleId: row.googleId as string,
		name: row.name as string
	};

	if (Date.now() >= session.expiresAt.getTime()) {
		await db.execute({
			sql: 'DELETE FROM user_auth_session WHERE id = ?',
			args: [session.id]
		});
		return { session: null, user: null };
	}
	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		db.execute({
			sql: 'UPDATE user_auth_session SET expiresAt = ? WHERE user_auth_session.id = ?',
			args: [Math.floor(session.expiresAt.getTime() / 1000), session.id]
		});
	}
	return { session, user };
}

export function invalidateSession(sessionId: string): void {
	db.execute({
		sql: 'DELETE FROM user_auth_session WHERE id = ?',
		args: [sessionId]
	});
}

export function invalidateUserSessions(userId: number): void {
	db.execute({ sql: 'DELETE FROM user_auth_session WHERE userId = ?', args: [userId] });
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
	event.cookies.set(sessionCookieName, token, {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		expires: expiresAt
	});
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set(sessionCookieName, '', {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		maxAge: 0
	});
}

export function generateSessionToken(): string {
	const tokenBytes = new Uint8Array(20);
	crypto.getRandomValues(tokenBytes);
	const token = encodeBase32(tokenBytes).toLowerCase();
	return token;
}

type SessionValidationResult =
	| { session: Partial<MembersOnly<AuthSession>>; user: Partial<MembersOnly<User>> }
	| { session: null; user: null };
