<script>
	import { onMount } from 'svelte';
	import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
	import Post from '$components/post.svelte';
	import { db } from '$lib/utils/firebase';

	let posts = [];
	onMount(async () => {
		const q = query(collection(db, 'posts'), orderBy('postedOn', 'desc'));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
		  // clear posts to not add duplicate posts
		  posts = [];
			querySnapshot.forEach(async (doc) => {
				const data = doc.data();
          console.log(data);
				posts = [...posts, {
					displayName: `@${data.displayName}`,
					postBody: data.postBody,
					fileUrl: data.fileUrl,
					fileId: data.fileId,
					isVideo: data.isVideo,
					postedOn: data.postedOn.toDate().toString().slice(4, 21),
					postId: doc.id
				}];
			});
		});
		return unsubscribe;
	});
</script>

<ul>
	{#each posts as post (post.postId)}
		<Post {...post} />
	{/each}
</ul>
