<script>
	import Transition from '$lib/components/transition.svelte';
	import Message from '$lib/components/chat-message.svelte';
	import { messages } from '$utils/stores';
</script>

<Transition>
	<main class="grid place-content-center">
    {#if [...$messages].length > 0}
		<ul>
      {#each [...$messages] as [messageId, message] (messageId)}
        <Message {...message}/>
      {/each}
		</ul>
    {/if}
	</main>
</Transition>
