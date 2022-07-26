<script lang="ts">
  import { user } from '$lib/stores';

	export let message;
	let isOwnMessage = $user.uuid === message.uuid;
</script>

<li
	class="p-3 card w-60 sm:w-72 md:w-80 overflow-visible bg-base-100 shadow-xl card-compact {isOwnMessage
		? 'ml-auto bg-primary rounded-br-none text-primary-content'
		: 'mr-auto bg-secondary rounded-bl-none text-secondary-content'}"
>
	<p class="text-accent-content ">@{message.username}</p>
    
  <p >{message.message}</p>
	<p class="text-right h-auto">
		{new Date(message.created_at).toLocaleString('en-US', { timeStyle: 'short' })}
	</p>
</li>
