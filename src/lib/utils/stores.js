import { readable, get } from 'svelte/store';
import { browser } from '$app/env';
import { docToPost, docToMessage, db } from '$utils/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

function createStore(firestoreQuery, docToObj) {
	const { subscribe } = readable(new Map(), (set) => {
		let unsubscribe = () => {};

		async function init() {
			if (!browser) return;

			unsubscribe = onSnapshot(firestoreQuery, (snap) => {
				const objects = new Map();
				snap.forEach((doc) => {
					objects.set(...docToObj(doc));
				});
				set(objects);
			});
		}

		init();
		return unsubscribe;
	});

	return {
		subscribe
	};
}

const postsQuery = query(collection(db, 'posts'), orderBy('postedOn', 'desc'));
export const posts = createStore(postsQuery, docToPost);

const messagesQuery = query(collection(db, 'messages'), orderBy('postedOn', 'asc'));
export const messages = createStore(messagesQuery, docToMessage);
