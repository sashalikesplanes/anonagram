<script>
	export let displayName, postBody, fileUrl, postedOn, isVideo, postId, fileId;
</script>

<li class="card w-11/12 mx-auto my-3 bg-base-100 shadow-xl">
	<form class="" action="/posts/{postId}?_method=DELETE" method="post">
		<input type="hidden" id="fileId" name="fileId" value={fileId} />
		<button class="btn z-10 btn-circle absolute ml-auto right-3 top-3" type="submit">
			<svg
				class="h-8 w-8"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				><path
					d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z"
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
	<div class="card-body relative">
		<button class="btn btn-circle z-10 btn-circle absolute right-3 top-3">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				stroke="currentColor"
				class="h-8 w-8"
				viewBox="0 0 50 50"
				><path
					d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"
				/></svg
			>
		</button>
		<h2 class="card-title">{displayName}</h2>
		<p>{postBody}</p>
		<p class="text-right text-slate-500">{postedOn}</p>
	</div>
</li>
