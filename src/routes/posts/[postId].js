import { db } from '$utils/firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { publitioApi } from 'publitio_js_sdk';

const publitio = publitioApi(
	import.meta.env.VITE_PUBLITIO_API_KEY,
	import.meta.env.VITE_PUBLITIO_API_SECRET
);

export const del = async ({ request, params }) => {
	const postId = params.postId;
	const form = await request.formData();
	const fileId = form.get('fileId');
	try {
		await deleteDoc(doc(db, 'posts', postId));
	} catch (e) {
		throw new Error(`Failed to delete doc from firestore: ${e.message}`);
	}

	const response = await publitio.call(`/files/delete/${fileId}`, 'DELETE');
	if (response.code !== 200) {
		throw new Error('Failed to delete from publitio');
	}

	return {
		status: 204,
	};
};

export const patch = async ({ request, params }) => {
	const postId = params.postId;
	const form = await request.formData();
	const postBody = form.get('postBody');

	try {
		await updateDoc(doc(db, 'posts', postId), {
			postBody
		});
	} catch (e) {
		throw new Error(`Failed to modify post body in firestore: ${e.message}`);
	}

	return {
    status: 204,
  }
};
