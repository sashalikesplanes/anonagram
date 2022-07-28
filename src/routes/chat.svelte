<script lang="ts">
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query';
  import Messages from '$lib/components/messages.svelte';

  const client = new QueryClient();
</script>

<QueryClientProvider {client}>
  <Messages />
</QueryClientProvider>
