<script>
	import '$lib/global.css';
	import { page, navigating } from '$app/stores';
</script>

<header>
	<h1 class="m-auto w-fit text-4xl font-bold mt-3">Anonagram</h1>
	<div class="btn-group mx-auto w-fit mt-3">
		<a sveltekit:prefetch class={`btn ${$page.url.pathname === '/' ? 'btn-active' : ''}`} href="/"
			>Feed</a
		>
		<a
			sveltekit:prefetch
			class={`btn ${$page.url.pathname === '/new-post' ? 'btn-active' : ''}`}
			href="/new-post">New</a
		>
	</div>
</header>
{#if $navigating}
  <h1 class="text-4xl">Loading</h1>
{:else}
<slot class="flex flex-col"/>
{/if}
