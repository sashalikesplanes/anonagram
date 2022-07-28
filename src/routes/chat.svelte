<script lang="ts">
	import HeaderMainFooter from '$lib/components/header-main-footer.svelte';
	import Messages from '$lib/components/messages.svelte';
	import SendMessage from '$lib/components/send-message.svelte';

	import { QueryClientProvider, QueryClient } from '@sveltestack/svelte-query';
	import { onMount } from 'svelte';
	const client = new QueryClient();

	let visible = false;

	onMount(() => {
		visible = true;
	});
</script>

<HeaderMainFooter>
	<QueryClientProvider slot="main" let:scrollContainer {client}>
		{#if visible}
			<Messages {scrollContainer}/>
		{/if}
	</QueryClientProvider>

	<svelte:fragment slot="footer">
		{#if visible}
			<SendMessage />
		{/if}
	</svelte:fragment>
</HeaderMainFooter>

<!-- {#if visible}
{/if} -->
