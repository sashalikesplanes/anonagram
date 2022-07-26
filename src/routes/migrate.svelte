<script>
	import { supabase } from '$lib/utils/supabase';
	import { docToPost, docToMessage, db } from '$utils/firebase';
	import { collection, query, orderBy, getDocs } from 'firebase/firestore';
	async function migrate() {
		// read posts from firebase
		const postsQuery = query(collection(db, 'posts'));
		const posts = await getDocs(postsQuery);
		const postsDocs = posts.docs;
		for (let i = 0; i < postsDocs.length; i++) {
			const doc = postsDocs[i];
			const dataF = doc.data();
			const { data, error } = await supabase.from('posts').insert({
				display_name: dataF.displayName,
				post_body: dataF.postBody,
				file_id: dataF.fileId,
				file_type: dataF.fileType,
				file_url: dataF.fileUrl,
				is_video: dataF.isVideo,
				posted_on: new Date(dataF.postedOn.toDate()).toISOString(),
			});
			console.log(data, error);
		}
	}
</script>

<button on:click={migrate}>Migrate</button>
