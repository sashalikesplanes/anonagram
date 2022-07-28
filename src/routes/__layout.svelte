<script>
	import '../app.css';
	import Navigation from '$lib/components/navigation.svelte';
</script>

<!-- Allows fixed header and scrollable main -->

<body class="flex flex-col gap-3 h-screen">
	<header>
		<h1 class="m-auto w-fit text-4xl font-bold mt-3">Anonagram</h1>
		<Navigation />
	</header>

  <slot />
</body>

