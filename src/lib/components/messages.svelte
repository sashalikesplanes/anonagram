<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import { fade } from 'svelte/transition';
	import { tick } from 'svelte';
	import autoAnimate from '@formkit/auto-animate';

	import supabase from '$lib/db';
	import Message from '$lib/components/message.svelte';

	export let scrollContainer: HTMLElement;

	const LOAD_MORE_THRESHOLD_PX = 200;


	let messagesResult = useQuery(
		'messages',
		async () => {
			const { data, error } = await supabase
				.from('messages')
				.select('*')
				.order('created_at', { ascending: true });
			if (error) throw new Error();
			return data;
		},
		{
			refetchOnWindowFocus: false,
			onSuccess: async () => {
				await tick();
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
        scrollContainer.addEventListener('scroll', onScroll);
			}
		}
	);

	function onScroll(event: UIEvent) {
		const scrollContainer = event.target as HTMLElement;
		if (scrollContainer.scrollTop < LOAD_MORE_THRESHOLD_PX) {
		  // load more and stuff
		}
	}
</script>

{#if $messagesResult.isLoading}
	<p transition:fade class="text-4xl text-center my-10">Loading...</p>
{:else if $messagesResult.isError}
	<p transition:fade class="text-4xl text-center my-10">Error: {$messagesResult.error.message}</p>
{:else}
	<ul
		class="mx-auto w-full flex flex-col gap-3 p-3"
		use:autoAnimate
		transition:fade
	>
		{#each $messagesResult.data as message (message.id)}
			<Message {message} />
		{/each}
	</ul>
{/if}
