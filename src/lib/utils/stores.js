// @ts-check
import { readable, get } from 'svelte/store';
import { browser } from '$app/env';
import { supabase, rowToPost } from '$utils/supabase';
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

// const postsQuery = query(collection(db, 'posts'), orderBy('postedOn', 'desc'));
export const posts = readable(null, (set) => {
	supabase
		.from('posts')
		.select('*')
		.order('posted_on', { ascending: false })
		.then(({ data, error }) => {
			if (error) throw new Error('error fetching data');
			const posts = new Map();
			data.forEach((row) => {
				posts.set(...rowToPost(row));
			});
			set(posts);
		});

	const subscription = supabase
		.from('posts')
		.on('*', (payload) => {
			console.log('got update');
			console.log(payload);
			set([...get(posts), payload.new]);
		})
		.subscribe();

	return () => supabase.removeSubscription(subscription);
});

const messagesQuery = query(collection(db, 'messages'), orderBy('postedOn', 'asc'));
export const messages = createStore(messagesQuery, docToMessage);
