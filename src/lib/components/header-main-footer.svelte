<script lang="ts">
	import Navigation from '$lib/components/navigation.svelte';
	let scrollContainer: HTMLElement;
</script>

<body class="flex flex-col gap-3 h-screen">
	<header>
		<h1 class="m-auto w-fit flex-shrink-0 text-4xl font-bold mt-3">Anonagram</h1>
		<Navigation />
	</header>

	<main bind:this={scrollContainer} class="flex-1 overflow-y-auto">
			<slot {scrollContainer} name="main" />
	</main>

	<footer class="">
		<slot name="footer" />
	</footer>
</body>
