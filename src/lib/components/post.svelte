<script>
	export let username, body, url, postedOn, isVideo;
</script>

<li class="card md:w-192 w-11/12 mx-auto my-3 bg-base-100 shadow-xl">
	<figure>
    {#if isVideo}
      <video autoplay class="w-full" src="{url}" alt="A video"></video>
    {:else}
			<img src="{url}" alt="A picture" />
		{/if}
	</figure>
	<div class="card-body">
		<h2 class="card-title">{username}</h2>
		<p>{body}</p>
		<p class="text-right text-slate-500">{postedOn}</p>
	</div>
</li>
