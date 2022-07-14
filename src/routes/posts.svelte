<script>
	import { onMount } from 'svelte';
	import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
	import Post from '$components/post.svelte';
	import { db, docToPost } from '$lib/utils/firebase';

	export let posts = [];
	onMount(async () => {
		const q = query(collection(db, 'posts'), orderBy('postedOn', 'desc'));
		const unsub = onSnapshot(q, (querySnapshot) => {
			// clear posts to not add duplicate posts
			posts = [];
        querySnapshot.forEach(async (doc) => {
            const post = docToPost(doc);
            // Assignement needed to trigger svelte reactivity
            posts = [...posts, post];
          });
		});
		return unsub;
	});
</script>

<ul>
	{#each posts as post (post.postId)}
		<Post {...post} />
	{/each}
</ul>
