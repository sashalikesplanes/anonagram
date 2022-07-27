<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="btn-group mx-auto w-fit mt-3">
	<a
		sveltekit:prefetch
		class={`btn ${$page.url.pathname === '/chat' ? 'btn-active' : ''}`}
		href="/chat">Chat</a
	>
	<a
		sveltekit:prefetch
		class={`btn ${$page.url.pathname === '/posts' ? 'btn-active' : ''}`}
		href="/posts">Feed</a
	>
	<a
		sveltekit:prefetch
		class={`btn ${$page.url.pathname === '/new-post' ? 'btn-active' : ''}`}
		href="/new-post">New</a
	>
</div>
