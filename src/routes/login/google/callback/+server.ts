import { generateSessionToken, setSessionTokenCookie } from '$lib/server/auth/session';
import { google } from '$lib/server/auth/google';
import { decodeIdToken } from 'arctic';

import type { RequestEvent } from '@sveltejs/kit';
import type { OAuth2Tokens } from 'arctic';
import { createUser, createSession, getUserFromGoogleId } from '$lib/server/auth/utils';

// {
//   iss: 'https://accounts.google.com',
//   azp: 'b.',
//   aud: 'b.',
//   sub: 'a',
//   email: 'a',
//   email_verified: true,
//   at_hash: '-',
//   name: '',
//   picture: 'asd',
//   given_name: 'as',
//   family_name: 'a',
//   iat: 22..,
//   exp: 12.
// }

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('google_oauth_state') ?? null;
	const codeVerifier = event.cookies.get('google_code_verifier') ?? null;
	if (code === null || state === null || storedState === null || codeVerifier === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 400
		});
	}

	const claims = decodeIdToken(tokens.idToken()) as { sub: string; name: string };

	const googleUserId = claims.sub;
	const name = claims.name;

	// TODO: Replace this with your own DB query.
	const existingUser = await getUserFromGoogleId(googleUserId);

	if (existingUser !== null) {
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser.id);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/app'
			}
		});
	}

	// TODO: Replace this with your own DB query.
	const user = await createUser(googleUserId, name);

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user.id);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);
	return new Response(null, {
		status: 302,
		headers: {
			Location: '/app'
		}
	});
}
