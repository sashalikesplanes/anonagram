<script>
	export let displayName, postBody, fileUrl, postedOn, isVideo;
</script>

<li class="card md:w-192 w-11/12 mx-auto my-3 bg-base-100 shadow-xl">
	<figure>
    {#if isVideo}
      <video autoplay class="w-full" src="{fileUrl}" alt="A video"></video>
    {:else}
			<img src="{fileUrl}" alt="A picture" />
		{/if}
	</figure>
	<div class="card-body">
		<h2 class="card-title">{displayName}</h2>
		<p>{postBody}</p>
		<p class="text-right text-slate-500">{postedOn}</p>
	</div>
</li>
