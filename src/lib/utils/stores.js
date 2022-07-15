import { readable, get } from 'svelte/store';
import { browser } from '$app/env';

function createPosts() {
	const { subscribe } = readable(new Map(), (set) => {
		let unsubscribe = () => {};

		async function init() {
			if (!browser) return;
			const { collection, query, orderBy, onSnapshot } = await import('firebase/firestore');
			const { db, docToPost } = await import('$utils/firebase');

			const q = query(collection(db, 'posts'), orderBy('postedOn', 'desc'));

			unsubscribe = onSnapshot(q, (snap) => {
        const posts = new Map();
        snap.forEach((doc) => {
          posts.set(...docToPost(doc));
        });
        set(posts);
        console.log(posts);
			});
		}

		init();
		return unsubscribe;
	});

	return {
		subscribe
	};
}

export const posts = createPosts();
