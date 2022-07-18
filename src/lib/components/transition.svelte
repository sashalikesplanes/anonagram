<script>
	import { fly, fade } from 'svelte/transition';

	let y = 200;
	let duration = 600;
	export let url = "";
</script>

{#key url}
	<div in:fly={{ x: -50, duration, delay: duration }} out:fly={{ x: 50, duration }}>
		<slot />
	</div>
{/key}
