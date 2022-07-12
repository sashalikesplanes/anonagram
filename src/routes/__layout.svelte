<script>
  import '$lib/global.css';
  import { page } from '$app/stores';
</script>

<h1 class="m-auto w-fit text-4xl font-bold mt-3">Anonagram</h1>

<div class="btn-group mx-auto w-fit mt-3">
  <a sveltekit:prefetch class={`btn ${$page.url.pathname === '/' ? 'btn-active' : ''}`} href="/">Feed</a>
  <a sveltekit:prefetch class={`btn ${$page.url.pathname === '/new-post' ? 'btn-active' : ''}`} href="/new-post">New</a>
</div>
<slot />
