<script>
	export let posts;
	import Post from '$components/post.svelte';
</script>

<ul class="m-auto w-fit max-w-6xl">
	{#each posts as post}
    <Post { ...post  } />
	{/each}
</ul>
