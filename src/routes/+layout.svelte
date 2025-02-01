<script lang="ts">
	import { pwaInfo } from 'virtual:pwa-info';
	import { pwaAssetsHead } from 'virtual:pwa-assets/head';
	import '../app.css';

	interface Props {
		children?: import('svelte').Snippet;
	}
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

<style>
  @reference "tailwindcss/theme";
  :global(html) {
  	@apply min-h-screen w-full flex flex-col items-center bg-fuchsia-50 selection:bg-fuchsia-500 selection:text-white text-fuchsia-950;
  }
  :global(body) {
  	@apply flex flex-col items-center w-full;
  }
</style>
