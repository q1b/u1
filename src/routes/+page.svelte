<script lang="ts">
	import { route } from '$lib/routes';
</script>

<h1>Hey, There!</h1>
<p>Continue with <a href={route('GET /login/google')} data-sveltekit-replacestate>Google</a> to access the app</p>
