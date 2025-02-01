import webPush from 'web-push';
import { VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } from '$env/static/private';

webPush.setVapidDetails(
	'mailto:sukhpreetben10@gmail.com', // Replace with your email
	VAPID_PUBLIC_KEY,
	VAPID_PRIVATE_KEY
);

export { webPush };
