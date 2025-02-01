<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<main class="w-full max-w-2xl p-4">
	<h2 class="text-xl">Welcome, {data.user.name}</h2>
	<h3 class="text-lg">Choose the date & time for your osteopathy session</h3>
</main>
