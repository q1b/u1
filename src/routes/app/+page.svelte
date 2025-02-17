<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';
	import { Settings, CalendarPlus, MessagesSquare } from 'lucide-svelte';
	import { route } from '$lib/routes';
	let dialog = $state({
		el: null,
		open: () => dialog.el.showModal(),
		close: () => dialog.el.close()
	});
	let { data }: PageProps = $props();
</script>

<main class="w-full max-w-2xl p-4 relative">
	<h2 class="text-xl">Welcome, {data.user.name}</h2>
	<div class="flex gap-x-4 mt-4">
		<button
			class="cursor-pointer p-2 rounded-full bg-fuchsia-300 hover:scale-95"
			aria-label="goto messages"
		>
			<MessagesSquare />
		</button>
		<a
			class="p-2 rounded-full bg-fuchsia-300 hover:scale-95"
			href={route('/app/settings')}
			data-sveltekit-reload
			aria-label="goto app settings"
		>
			<Settings />
		</a>
		<button
			onclick={() => dialog.open()}
			class="cursor-pointer p-2 rounded-full bg-fuchsia-300 hover:scale-95"
		>
			<CalendarPlus />
		</button>
	</div>
</main>

<dialog
	bind:this={dialog.el}
	class="p-4 w-full max-w-xs rounded-xl self-center justify-self-center bg-layer-3 backdrop:backdrop-blur-sm border border-layer-7"
>
	<div>
		<h3 class="text-lg">Choose the timings which is suitable to you!</h3>
		<form
			method="post"
			use:enhance={() => {
				return async ({ result, update }) => {
					// `result` is an `ActionResult` object
					// `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
					console.log(result);
					await update();
					if (result.type === 'success') {
						dialog.close();
					}
				};
			}}
			class="flex flex-col gap-y-4 mt-4"
		>
			<div class="">
				<label for="date" id="date">Select Date:</label>
				<input id="date" name="date" type="date" required />
			</div>
			<div class="">
				<label for="time" id="time">Select Time:</label>
				<input id="time" name="time" min="08:00" max="19:00" type="time" required />
			</div>
			<div class="flex gap-x-2">
				<button
					value="cancel"
					type="button"
					onclick={() => dialog.close()}
					variant="secondary"
					formmethod="dialog"
					class="border px-2 py-1"
				>
					Cancel
				</button>
				<button type="submit" class="btn-fuchsia w-max">Submit</button>
			</div>
		</form>
	</div>
</dialog>
