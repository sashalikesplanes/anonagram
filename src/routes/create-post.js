import { storage, db } from '$utils/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { doc, Timestamp, collection, addDoc } from 'firebase/firestore';

export const post = async ({ request }) => {
	const form = await request.formData();
	const displayName = form.get('displayName');
	const postBody = form.get('postBody');
	const postFile = form.get('postFile');
	const fileType = postFile.type.split('/')[1];

	const uuid = crypto.randomUUID();
	const imagePath = `/post-images/${uuid}.${fileType}`;
	const imageRef = ref(storage, imagePath);

	console.log(fileType, postFile.type.split('/')[0] === 'video'); 

  console.log(postFile);
	try {
		// Gotta make it to arrayBuffer otherwise firestore fails :/
		// await uploadBytes(imageRef, await postFile.arrayBuffer(), { contentType: postFile.type });
		await uploadBytes(imageRef, postFile, { contentType: postFile.type });

		await addDoc(collection(db, 'posts'), {
			username: displayName,
			body: postBody,
			imagePath,
			isVideo: postFile.type.split('/')[0] === 'video',
			postedOn: Timestamp.fromDate(new Date())
		});
	} catch (error) {
		throw new Error(`Failed to create post: ${error.message}`);
	}

	return {
		status: 302,
		headers: { location: '/' }
	};
};
// Hack required to import google cloud storage which is a commonJs
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const {Storage} = require('@google-cloud/storage');
//
// export const post = async ({ request }) => {
// async function generateV4UploadSignedUrl(imagePath) {
// const storageGCloud = new Storage();
// const options = {
// version: 'v4',
// action: 'write',
// expires: Date.now() + 15 * 60 * 1000,
// contentType: 'application/octet-stream'
// };
//
// const [url] = await storageGCloud.bucket('gs://anonagram-e0c6c.appspot.com').file(imagePath).getSignedUrl(options);
//
// return url;
// }
//
// // TODO
//
// // 1. Add validation
//
// console.log(request);
// const form = await request.json();
// console.log(form);
// const displayName = form.displayName;
// const postBody = form.postBody;
// // const postFile = form.get('postFile');
// // const fileType = postFile.type.slice(6);
//
// const fileType = 'png';
// const uuid = crypto.randomUUID();
// const imagePath = `/post-images/${uuid}.${fileType}`;
// // const imageRef = ref(storage, imagePath);
// return {
// status: 200,
// headers: { 'Content-Type': 'application/json' },
// body: {
// url: await generateV4UploadSignedUrl(imagePath)
// }
// };
// };
