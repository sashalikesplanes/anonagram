<script>
	// Pages fetch data, components are dumb
	import Post from '$lib/components/post.svelte';
	import { page } from '$app/stores';
	import { posts } from '$utils/stores';
	import Transition from '$lib/components/transition.svelte';

	const postId = $page.params.postId;
	$: post = $posts.get(postId);
</script>

<Transition>
	{#if post}
		<Post {postId} {...post} />
	{:else}
		<h1 class="text-center my-[100px] text-4xl">Loading...</h1>
	{/if}
</Transition>
