<script lang="ts">
	import { enhance } from "$app/forms"
	import type { PageProps } from './$types';
	import { Settings } from 'lucide-svelte'
	let { data }: PageProps = $props();
</script>

<main class="w-full max-w-2xl p-4 relative">
	<h2 class="text-xl">Welcome, {data.user.name}</h2>
	<a class="absolute right-4 top-4" href="app/settings" aria-label="goto app settings">
		<Settings />
	</a>
	<h3 class="text-lg">Choose the timings which is suitable to you!</h3>
	<form method="post" use:enhance class="flex flex-col gap-y-4 mt-4">
		<div class="">
			<label for="date" id="date">Select Date:</label>
			<input id="date" name="date" type="date" />
		</div>
		<div class="">
			<label for="time" id="date">Select Time:</label>
			<input id="time" name="time" type="time" />
		</div>
		<button class="btn-fuchsia w-max">Submit</button>
	</form>
</main>
