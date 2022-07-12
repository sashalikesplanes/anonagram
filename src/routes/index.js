import { storage, db } from '$utils/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export const get = async () => {
  const q = query(collection(db, 'posts'), orderBy('postedOn', 'desc'));
  const querySnapshot = await getDocs(q);

  const posts = [];
  let imgUrls = [];
  querySnapshot.forEach(async (doc) => {
    const data = doc.data();
    posts.push({
      username: `@${data.username}`,
      body: data.body,
      postedOn: data.postedOn.toDate().toString().slice(4, 21),
      isVideo: data.isVideo
    });

    // Separate array to apply promise.all for speed
    imgUrls.push(getDownloadURL(ref(storage, data.imagePath)));
  });

  imgUrls = await Promise.all(imgUrls);

	return {
		headers: { 'Content-Type': 'application/json' },
		status: 200,
		body: { posts: posts.map((post, idx) => {
		  return {
        ...post,
        url: imgUrls[idx]
      }
    })}
	};
};
