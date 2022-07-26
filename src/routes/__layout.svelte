<script>
	import '$lib/global.css';
	import { page } from '$app/stores';
</script>

<div class="flex flex-col h-screen gap-3">
  <header>
    <h1 class="m-auto w-fit text-4xl font-bold mt-3">Anonagram</h1>
    <div class="btn-group mx-auto w-fit mt-3">
      <a
        sveltekit:prefetch
        class={`btn ${$page.url.pathname === '/chat' ? 'btn-active' : ''}`}
        href="/chat">Chat</a
      >
      <a
        sveltekit:prefetch
        class={`btn ${$page.url.pathname === '/posts' ? 'btn-active' : ''}`}
        href="/posts">Feed</a
      >
      <a
        sveltekit:prefetch
        class={`btn ${$page.url.pathname === '/new-post' ? 'btn-active' : ''}`}
        href="/new-post">New</a
      >
    </div>
  </header>
  <div class="flex-shrink overflow-scroll">
    <slot  />
  </div>
</div>
