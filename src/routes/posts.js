import { db } from '$utils/firebase';
import { Timestamp, collection, addDoc } from 'firebase/firestore';

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
		status: 201,
		// TODO add location
	};
};
