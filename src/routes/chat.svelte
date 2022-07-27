<script lang="ts">
	import { supabase } from '$lib/db';
	import Message from '$lib/components/message.svelte';
	import { user } from '$lib/stores';
	import { onMount, tick } from 'svelte';
	import { fly } from 'svelte/transition';

	// TODO BIG BIG BIG REFACTOR
	// New cheacky change

	let bottomMessage;
	let message;

	let isSending = false;
	let visible = false;

	let nextMessagePage = 1;
	let isOutOfMessages = false;
	let isLoadingMore = false;
	const LOAD_MORE_THRESHOLD = 200;

	let messagesList;
	export let messages;

	onMount(async () => {
		visible = true;
		await tick(); // wait for list to exist
		messagesList.scrollTop = messagesList.scrollHeight;

		messagesList.addEventListener('scroll', onScroll);

		const subscription = supabase
			.from('messages')
			.on('INSERT', (payload) => {
				messages = [...messages, payload.new];
				scrollToBottomMessage();
			})
			.subscribe();

		return () => supabase.removeSubscription(subscription);
	});

	async function onScroll() {
		if (isOutOfMessages) return;

		if (messagesList.scrollTop < LOAD_MORE_THRESHOLD && !isOutOfMessages && !isLoadingMore) {
			isLoadingMore = true;
			await loadMoreMessages();
			isLoadingMore = false;
		}
	}

	async function loadMoreMessages() {
		const response = await fetch(
			'/chat?' + new URLSearchParams({ page: String(nextMessagePage) }),
			{
				method: 'get',
				headers: { accept: 'application/json' }
			}
		);
		const moreMessages = (await response.json()).messages;

		if (moreMessages.length === 0) isOutOfMessages = true;

		nextMessagePage += 1;

		const previousScrollHeight = messagesList.scrollHeight;
		const previousScrollTop = messagesList.scrollTop;
		messages = [...moreMessages, ...messages];
		await tick();
		messagesList.scrollTop = messagesList.scrollHeight - previousScrollHeight + previousScrollTop;
		return;
	}

	async function scrollToBottomMessage() {
		await tick();
		bottomMessage.scrollIntoView({ behavior: 'smooth' });
	}

	async function handleSubmit(event) {
		const form = event.target;
		const body = new FormData(form);
		isSending = true;
		const response = await fetch('/chat', {
			method: 'post',
			body
		});
		message = '';
		isSending = false;
		if (!response.ok) throw new Error('Failed to send message');
	}
</script>

<div class="h-full overflow-hidden flex flex-col w-11/12 mx-auto pb-3">
	<!-- <h1 class="mb-3 text-bold text-4xl text-center">Anonchat</h1> -->
	{#if visible}
		<ul
			in:fly={{ x: 1000, duration: 400 }}
			class="mx-auto overflow-scroll mb-3 max-w-3xl w-full flex flex-col gap-3"
			bind:this={messagesList}
		>
			{#each messages as message (message.id)}
				<Message {message} />
			{/each}
			<li bind:this={bottomMessage} />
		</ul>
		<form
			in:fly={{ x: 1000, duration: 400 }}
			action="/"
			method="POST"
			class="flex relative gap-3 mt-3 w-full max-w-3xl mx-auto"
			on:submit|preventDefault={handleSubmit}
		>
			<textarea
				name="message"
				id="message"
				class="textarea text-base flex-1 textarea-primary h-16 overflow-scroll"
				placeholder="type here..."
				bind:value={message}
			/>
			<input type="hidden" name="username" id="username" value={$user.username} />
			<input type="hidden" name="uuid" id="uuid" value={$user.uuid} />
			<input
				type="submit"
				disabled={isSending || !message || message.length === 0}
				class="btn text-center btn-lg btn-square btn-primary"
				value="Send"
			/>
		</form>
	{/if}
</div>
