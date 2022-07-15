<script>
	import Post from '$components/post.svelte';
	import { posts } from '$utils/stores';
</script>

<ul>
	{#each [...$posts] as [postId, post] (postId)}
    <Post {...post} {postId} />
	{/each}
</ul>
