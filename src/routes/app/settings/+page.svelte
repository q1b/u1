<script lang="ts">
	import NotificationButton from "./notification.svelte"
	import { onMount } from 'svelte';

	let installPrompt = $state(null);
	let installButton = $state(null);
	function disableInAppInstallPrompt() {
  		installPrompt = null;
  		installButton.setAttribute("hidden", "");
	}

	onMount(() => {
		window.addEventListener("beforeinstallprompt", (event) => {
			event.preventDefault();
  			installPrompt = event;
  			installButton.removeAttribute("hidden");
		});
		window.addEventListener("appinstalled", () => {
			disableInAppInstallPrompt()
		});
	})
</script>

<button bind:this={installButton} onclick={() => {
 	if (!installPrompt) return;
  	const result = await installPrompt.prompt();
   	console.log(`Install prompt was: ${result.outcome}`);
    disableInAppInstallPrompt()
}} hidden>Install</button>

<NotificationButton />
