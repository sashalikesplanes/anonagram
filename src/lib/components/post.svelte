<script>
	import Icon from '$components/icon.svelte';
	import { enhance } from '$lib/utils/form';

	export let displayName, postBody, fileUrl, postedOn, isVideo, postId, fileId;
	let editing = false;
</script>

<li class="card w-11/12 max-w-3xl mx-auto my-3 bg-base-100 shadow-xl">
	<form class="" action="/posts/{postId}?_method=DELETE" method="post" use:enhance>
		<input type="hidden" id="fileId" name="fileId" value={fileId} />
		<button class="btn z-10 btn-circle absolute ml-auto right-3 top-3" type="submit">
			<Icon iconType="delete" />
		</button>
	</form>
	<a href="/posts/{postId}">
		<figure>
			{#if isVideo}
				<video autoplay class="w-full" src={fileUrl} alt="A video">
					<track kind="captions" />
				</video>
			{:else}
				<img src={fileUrl} alt="A user submition" />
			{/if}
		</figure>
	</a>
	<div class="card-body relative pb-3">
		<h2 class="card-title">{displayName}</h2>
		{#if !editing}
			<button
				class="btn btn-circle z-10 btn-circle absolute right-3 top-3"
				on:click={() => (editing = !editing)}
			>
				<Icon iconType="edit" />
			</button>
			<p>{postBody}</p>
		{:else}
			<form
				action="/posts/{postId}?_method=PATCH"
				method="post"
				use:enhance={() => (editing = false)}
			>
				<textarea autofocus class="textarea textarea-bordered w-full" name="postBody" id="postBody"
					>{postBody}</textarea
				>
				<button class="btn mt-3 block mx-auto" type="submit">Submit</button>
			</form>
		{/if}
		<p class="text-right text-slate-500">{postedOn}</p>
	</div>
</li>
