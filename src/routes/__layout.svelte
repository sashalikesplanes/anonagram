<script lang="ts">
	import Navigation from '$lib/components/navigation.svelte';
	import '../app.css';
</script>

<body>
	<header>
		<h1 class="m-auto w-fit text-4xl font-bold mt-3">Anonagram</h1>
		<Navigation />
	</header>

	<main>
		<slot />
	</main>
</body>
