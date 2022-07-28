<script lang="ts">
	import { QueryClient, useInfiniteQuery, type InfiniteData } from '@sveltestack/svelte-query';
	import { fade } from 'svelte/transition';
	import { onMount, tick } from 'svelte';

	import supabase from '$lib/db';
	import Message from '$lib/components/message.svelte';

	export let scrollContainer: HTMLElement;
	export let client: QueryClient;

	type Message = {
		id: number;
		created_at: string;
		uuid: string;
		username: string;
		message: string;
	};

	const LOAD_MORE_THRESHOLD_PX = 200;

	async function fetchMessages({ pageParam = 0 }) {
		const MESSAGES_PER_PAGE = 10;

		const { data, error } = await supabase
			.from<Message>('messages')
			.select('*')
			.order('created_at', { ascending: false })
			.range(pageParam * MESSAGES_PER_PAGE, (pageParam + 1) * MESSAGES_PER_PAGE - 1);

		if (error) throw new Error();

		let nextPage: number | undefined;
		if (data.length < MESSAGES_PER_PAGE) {
			nextPage = undefined;
		} else nextPage = pageParam + 1;

		return {
			currentPage: pageParam,
			data,
			nextPage
		};
	}

	let messagesResult = useInfiniteQuery({
		queryKey: 'messages',
		queryFn: fetchMessages,
		getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
		refetchOnWindowFocus: false,
		onSuccess: async () => {
			const prevTop = scrollContainer.scrollTop;
			const prevHeight = scrollContainer.scrollHeight;
			await tick();
			scrollContainer.scrollTop = scrollContainer.scrollHeight - prevHeight + prevTop;
		},
		refetchOnReconnect: 'always'
	});

	// TODO fix this type
	function getMessagesFromQueryResult(queryResult: InfiniteData<typeof $messagesResult>): Message[] {
    const data = queryResult.data; 
    return [...data.pages].flatMap((page) => page.data).reverse()
	}

	async function scrollToBottom() {
		await tick();
		scrollContainer.scrollTop = scrollContainer.scrollHeight;
	}

	function onScroll(this: HTMLElement) {
		if (
			this.scrollTop < LOAD_MORE_THRESHOLD_PX &&
			!$messagesResult.isFetchingNextPage &&
			$messagesResult.hasNextPage
		) {
			$messagesResult.fetchNextPage();
		}
	}

	onMount(async () => {
		scrollContainer.addEventListener('scroll', onScroll);
		// create subscription
		return supabase
			.from('messages')
			.on('*', (_) => {
				// Naive approach to just refetch the data
				client.invalidateQueries('messages');
			})
			.subscribe();
	});
</script>

{#if $messagesResult.isLoading}
	<p transition:fade class="text-4xl text-center my-10">Loading...</p>
{:else if $messagesResult.isError}
	<p transition:fade class="text-4xl text-center my-10">Error: {$messagesResult.error.message || 'Unknow error'}</p>
{:else}
	<ul class="mx-auto w-full flex flex-col gap-3 p-3" transition:fade>
		{#if $messagesResult.isFetchingNextPage}
			<p>Loading spinner</p>
		{/if}
		{#each getMessagesFromQueryResult($messagesResult) as message (message.id)}
			<Message {message} />
		{/each}
	</ul>
{/if}
