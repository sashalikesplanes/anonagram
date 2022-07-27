<script lang="ts">
	import { fly } from 'svelte/transition';

	import { user, messages } from '$lib/stores';

	let visible = true;
	let messagesList: HTMLUListElement;
	let bottomMessage: HTMLLIElement;

	function handleSubmit() {}
</script>

<pre>{[...$messages].reverse().map(msg => msg.id).join(', ')}</pre>
<button on:click="{messages.loadMoreMessages}">load more</button>

<!-- {#if visible}
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
			disabled={ !message || message.length === 0}
			class="btn text-center btn-lg btn-square btn-primary"
			value="Send"
		/>
	</form>
{/if} -->
