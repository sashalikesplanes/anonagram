<script>
	import { onMount } from 'svelte';
	import { collection, query, onSnapshot, where, documentId } from 'firebase/firestore';
	import Post from '$lib/components/post.svelte';
	import { db, docToPost } from '$lib/utils/firebase';
	import { page } from '$app/stores';

	export let post = {};

	onMount(async () => {
		const postId = $page.params.postId;
		const q = query(collection(db, 'posts'), where(documentId(), '==', postId));
		const unsub = onSnapshot(q, (querySnapshot) => {
			post = docToPost(querySnapshot.docs[0]);
		});
		return unsub;
	});
</script>
<Post {...post} />
