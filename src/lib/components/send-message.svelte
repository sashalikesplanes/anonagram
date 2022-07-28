<script>
	import { fade } from 'svelte/transition';
	import { user } from '$lib/stores';

	let message = '';
	function handleSubmit() {}
</script>

<form
	transition:fade
	action="/"
	method="POST"
	class="flex gap-3 w-full px-3 pb-3 mx-auto"
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
		disabled={!message || message.length === 0}
		class="btn text-center btn-lg btn-square btn-primary"
		value="Send"
	/>
</form>
