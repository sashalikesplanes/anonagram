// @ts-check
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const rowToPost = (row) => {
	return [
		row.id,
		{
			displayName: row.display_name,
			postBody: row.post_body,
			fileUrl: row.file_url,
			fileId: row.file_id,
			isVideo: row.is_video,
			postedOn: new Date(row.posted_on).toDateString()
		}
	];
};
