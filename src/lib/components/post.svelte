<script>
	export let displayName, postBody, fileUrl, postedOn, isVideo, postId, fileId;
</script>

<li class="card w-11/12 mx-auto my-3 bg-base-100 shadow-xl">
	<form class="" action="/posts/{postId}?_method=DELETE" method="post">
    <input type="hidden" id="fileId" name="fileId" value="{fileId}">
		<button class="btn glass z-10 btn-circle absolute ml-auto right-3 top-3" type="submit">
			<svg
				class="h-6 w-6"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				><path
					d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z"
					fill="#0D0D0D"
				/></svg
			>
		</button>
	</form>
	<figure>
		{#if isVideo}
      <video autoplay class="w-full" src={fileUrl} alt="A video">
        <track kind="captions" />
      </video>
		{:else}
			<img src={fileUrl} alt="A user submition" />
		{/if}
	</figure>
	<div class="card-body">
		<h2 class="card-title">{displayName}</h2>
		<p>{postBody}</p>
		<p class="text-right text-slate-500">{postedOn}</p>
	</div>
</li>
