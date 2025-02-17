<script lang="ts">
	import { pwaInfo } from 'virtual:pwa-info';
	import { pwaAssetsHead } from 'virtual:pwa-assets/head';
	import '../app.css';
	import { Remult } from 'remult';
	import { createSubscriber } from 'svelte/reactivity';

	interface Props {
		children?: import('svelte').Snippet;
	}

	function initRemultSvelteReactivity() {
		Remult.entityRefInit = (x) => {
			let update = () => {};
			let s = createSubscriber((u) => {
				update = u;
			});
			x.subscribe({
				reportObserved: () => s(),
				reportChanged: () => update()
			});
		};
	}
	initRemultSvelteReactivity();

	let { children }: Props = $props();

	let webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');
</script>

<svelte:head>
	{#if pwaAssetsHead.themeColor}
		<meta name="theme-color" content={pwaAssetsHead.themeColor.content} />
	{/if}
	{#each pwaAssetsHead.links as link}
		<link {...link} />
	{/each}
	<!-- eslint-disable-next-line -->
	{@html webManifest}
</svelte:head>

{@render children()}
{#await import('$lib/PWABadge.svelte') then { default: PWABadge }}
	<PWABadge />
{/await}

<style>
	@reference "tailwindcss/theme";
	:global(html) {
		@apply min-h-screen w-full flex flex-col items-center bg-white text-slate-950 selection:bg-indigo-500 selection:text-white;
	}
	:global(body) {
		@apply flex flex-col items-center w-full;
	}
</style>
