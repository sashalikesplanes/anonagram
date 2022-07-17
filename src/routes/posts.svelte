<script>
	import Post from '$components/post.svelte';
	import { posts } from '$utils/stores';
</script>

{#if [...$posts].length > 0}
	<ul>
		{#each [...$posts] as [postId, post] (postId)}
			<Post {postId} {...post} />
		{/each}
	</ul>
{:else}
	<h1 class="text-center my-[100px] text-4xl">Loading...</h1>
{/if}
