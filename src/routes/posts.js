import { db, docToPost } from '$utils/firebase';
import { query, orderBy, getDocs, Timestamp, collection, addDoc } from 'firebase/firestore';

// export const get = async () => {
  // // Used to allow SSR instead of waiting for the client to load the data
  // // On initial page load
	// const q = query(collection(db, 'posts'), orderBy('postedOn', 'desc'));
	// const querySnapshot = await getDocs(q);
	// const posts = [];
	// querySnapshot.forEach((doc) => {
		// posts.push(docToPost(doc));
	// });
	// return {
		// status: 200,
		// body: { posts }
	// };
// };

export const post = async ({ request }) => {
	const form = await request.json();

	try {
		await addDoc(collection(db, 'posts'), {
			...form,
			isVideo: form.fileType === 'video',
			postedOn: Timestamp.fromDate(new Date())
		});
	} catch (error) {
		throw new Error(`Failed to upload file or to create the data ${error.message}`);
	}

	return {
		status: 201
		// TODO add location
	};
};
