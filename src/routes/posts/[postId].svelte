<script>
	import Post from '$lib/components/post.svelte';
	import { page } from '$app/stores';
	import { posts } from '$utils/stores';

	const postId = $page.params.postId;
  $: post = $posts.get(postId)
</script>
<Post {...post} {postId} />
