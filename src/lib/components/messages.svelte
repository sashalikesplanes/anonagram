<script lang="ts">
	import { fly } from 'svelte/transition';
	import { useQuery } from '@sveltestack/svelte-query';

	let messagesResult = useQuery('messages', async () => {
	  const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
	  if (error) throw new Error;
	  console.log(data)
	  return data;
	})

	import { user } from '$lib/stores';
  import supabase from '$lib/db';
  import Message from '$lib/components/message.svelte';


</script>

{#if $messagesResult.isLoading}
  <p class="text-4xl text-center my-10">Loading...</p>
{:else if $messagesResult.isError}
  <p>Error: {$messagesResult.error.message}</p>
{:else}
  {#each $messagesResult.data as message (message.id)}
    <Message {message}/>
  {/each}
{/if}
<!-- <pre>{[...$messages].reverse().map(msg => msg.id).join(', ')}</pre> -->
<!-- <button on:click="{messages.loadMoreMessages}">load more</button> -->

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
