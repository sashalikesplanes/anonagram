import { supabase } from '$lib/db';

export const GET = async ({ url }) => {
	const MESSAGES_PER_PAGE = 10;
	const page = Number(url.searchParams.get('page')) || 0;
	const { data: messages, error } = await supabase
		.from('messages')
		// TODO refactor the magic numbers
		.select('*')
		.order('created_at', { ascending: false })
		.range(page * MESSAGES_PER_PAGE, (page + 1) * MESSAGES_PER_PAGE - 1);

	if (error) {
		throw new Error(`Could not read from supabase 'messages' on index endpoint: ${error.message}`);
	}

	await new Promise(r => setTimeout(r, 100));
	return {
		status: 200,
		body: { messages: messages.reverse() }
	};
};

export const POST = async ({ request }) => {
	const form = await request.formData();
	const message = form.get('message');
	const username = form.get('username');
	const uuid = form.get('uuid');

	const { data: _, error } = await supabase.from('messages').insert([
		{
			message,
			username,
			uuid
		}
	]);

	if (!error) {
		return {
			status: 201
		};
	} else throw new Error(`Error inserting into the database: ${error.message}`);
};
