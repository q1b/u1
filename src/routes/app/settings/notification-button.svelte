<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_VAPID_KEY as VAPID_PUBLIC_KEY } from '$env/static/public';

	let supported = false;
	let subscribed = false;

	async function subscribe() {
		console.log('Subscribing');
		try {
			const registration = await navigator.serviceWorker.ready;
			console.log('Registration Ready');
			const subscription = await registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: VAPID_PUBLIC_KEY
			});

			console.log(subscription);

			await fetch('/api/push/subscribe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(subscription)
			});

			subscribed = true;
		} catch (err) {
			console.error('Failed to subscribe to push notifications:', err);
		}
	}

	onMount(async () => {
		supported = 'serviceWorker' in navigator && 'PushManager' in window;

		if (supported) {
			const registration = await navigator.serviceWorker.ready;
			const subscription = await registration.pushManager.getSubscription();
			subscribed = !!subscription;
		}
	});
</script>

{#if supported}
	<button
		onclick={subscribe}
		disabled={subscribed}
		class="px-4 py-2 mt-4 cursor-pointer bg-blue-600 text-white disabled:text-zinc-400 disabled:bg-zinc-400/20"
	>
		{subscribed ? 'Notifications Enabled' : 'Enable Notifications'}
	</button>
{/if}
