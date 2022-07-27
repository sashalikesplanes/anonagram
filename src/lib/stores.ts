import { readable, writable } from 'svelte/store';
import supabase from '$lib/db';

// TODO make a proper store
export const user = readable({ uuid: 'ddeec5b0-ac24-4451-a0e1-93471e3b9fc4', username: 'sasha' });
export const messages = await createMessages();

async function createMessages() {
  // create a store that can load previous messages on demand, and is subscribed to new messages
  const MESSAGES_PER_PAGE = 10;
  let allMessagesLoaded = false; // check at each db read if all messages loaded to prevent repeat requests

  let messages = []; // latest messages first 
  let currentMessagePage = 0;
  // read initial batch of messages
  const { subscribe, set } = writable(null, set => {
    loadMoreMessages();
    // create a subscription which updates messages
    // return unsubscribe
    const subscription = supabase
			.from('messages')
			.on('INSERT', (payload) => {
				messages = [payload.new, ...messages];
			})
			.subscribe();

		return () => supabase.removeSubscription(subscription);
  })

  async function loadMoreMessages() {
    // request the next messages page
    const startIdx = currentMessagePage * MESSAGES_PER_PAGE;
    const endIdx = (currentMessagePage + 1) * MESSAGES_PER_PAGE;
    console.log('loading more')

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
      .range(startIdx, endIdx - 1); // end index is inclusive

    if (error) throw new Error(`Problem reading posts from supabase ${error.message}`);

    if (data.length === 0) {
      allMessagesLoaded = true;
      return;
    }

    currentMessagePage += 1;
    set([...messages, ...data]);
  }

  return {
    subscribe,
    loadMoreMessages,
    allMessagesLoaded,
  }
}
