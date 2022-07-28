<script lang="ts">
	import { onMount } from 'svelte';

	import Messages from '$lib/components/messages.svelte';
	import SendMessage from '$lib/components/send-message.svelte';

	import { QueryClientProvider, QueryClient } from '@sveltestack/svelte-query';

	const client = new QueryClient();

	let visible = false; // for animations to play
	let scrollContainer: HTMLElement; // enable Messages to control scroll

	onMount(() => (visible = true));
</script>

<main bind:this={scrollContainer} class="flex-1 overflow-y-auto">
	<QueryClientProvider {client}>
		{#if visible}
			<Messages {client} {scrollContainer} />
		{/if}
	</QueryClientProvider>
</main>

<footer>
	{#if visible}
		<SendMessage />
	{/if}
</footer>
