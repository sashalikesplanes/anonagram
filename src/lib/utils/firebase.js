import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: 'anonagram-e0c6c.firebaseapp.com',
	projectId: 'anonagram-e0c6c',
	storageBucket: 'anonagram-e0c6c.appspot.com',
	messagingSenderId: '4553042815',
	appId: '1:4553042815:web:6fa8f4eb01ecf8413b084a'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export main things to be used by firestore
export const db = getFirestore(app);
export const storage = getStorage(app);

// ***************************************************************************
// Utility functions for working with firebase

// Convert a firebase document retrieved from firestore
// into a format for posts
export const docToPost = (doc) => {
	const data = doc.data();
	return [
		doc.id,
		{
			displayName: `@${data.displayName}`,
			postBody: data.postBody,
			fileUrl: data.fileUrl,
			fileId: data.fileId,
			isVideo: data.isVideo,
			postedOn: data.postedOn.toDate().toString().slice(4, 21)
		}
	];
};
