import { db } from '$utils/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export const get = async () => {
	const q = query(collection(db, 'posts'), orderBy('postedOn', 'desc'));
	const querySnapshot = await getDocs(q);

	const posts = [];
	querySnapshot.forEach(async (doc) => {
		const data = doc.data();
		posts.push({
			displayName: `@${data.displayName}`,
			postBody: data.postBody,
			fileUrl: data.fileUrl,
			fileId: data.fileId,
			isVideo: data.isVideo,
			postedOn: data.postedOn.toDate().toString().slice(4, 21),
			postId: doc.id
		});

		// Separate array to apply promise.all for speed
	});

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { posts }
	};
};
