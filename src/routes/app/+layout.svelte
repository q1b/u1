<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}
	let { children }: Props = $props();
</script>

<div class="w-full flex flex-col items-center">
	{@render children?.()}
</div>
