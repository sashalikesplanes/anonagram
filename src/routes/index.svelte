<script>
	export let posts;
	import Post from '$components/post.svelte';
</script>

<ul>
	{#each posts as post}
    <Post { ...post  } />
	{/each}
</ul>
