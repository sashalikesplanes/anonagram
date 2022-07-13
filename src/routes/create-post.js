import { db } from '$utils/firebase';
import { Timestamp, collection, addDoc } from 'firebase/firestore';

export const post = async ({ request }) => {
  // TODO refactor as JSON post request as a lot of boilerplate here
	const form = await request.formData();
	const postFile = form.get('postFile');
	const displayName = form.get('displayName');
	const postBody = form.get('postBody');
	const fileUrl = form.get('fileUrl');
	const fileType = form.get('fileType');

	try {
		await addDoc(collection(db, 'posts'), {
			displayName,
			postBody,
			fileUrl,
      isVideo: fileType === 'video',
			postedOn: Timestamp.fromDate(new Date())
		});
	} catch (error) {
		throw new Error(`Failed to upload file or to create the data ${error.message}`);
	}

	return {
		status: 302,
		headers: { location: '/' }
	};
};
