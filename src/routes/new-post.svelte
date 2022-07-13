<script>
	import { goto } from '$app/navigation';
	// let postFile;
	let displayName;
	let postBody;
	let files;
	let response;
	let uploading = false;

	async function handleSubmit() {
		// TODO Add validation
		uploading = true;
		const fileUploadForm = new FormData();
		fileUploadForm.append('file', files[0]);

		// TODO use XMLRequest in order to track progress?
		const res = await fetch('https://api.publit.io/v1/files/create/Rb0ybho9', {
			// DO NOT SET Content-Type: multipart as it confuses the browser
			method: 'POST',
			body: fileUploadForm
		});
		const resJSON = await res.json();
		if (resJSON.code !== 201) {
			uploading = false;
			throw new Error(`Error uploading file: ${resJSON.message}`);
		}
		const fileUrl = resJSON.url_short;
		const fileType = resJSON.type;

		// TODO refactor to be a JSON request
		const postCreateForm = new FormData();
		postCreateForm.append('fileUrl', fileUrl);
		postCreateForm.append('displayName', displayName);
		postCreateForm.append('postBody', postBody);
		postCreateForm.append('fileType', fileType);
		const resCreatePost = await fetch('/create-post', {
			method: 'POST',
			body: postCreateForm
		});
		uploading = false;
		goto('/');
	}
</script>

{#if uploading}
  <h1 class="text-4xl my-20 font-bold text-center">Uploading...</h1>
{:else}
	<form
		class="card md:w-192 w-11/12 mx-auto my-3 bg-base-100 shadow-xl"
		action="/create-post"
		method="post"
		enctype="multipart/form-data"
		on:submit|preventDefault={handleSubmit}
	>
		<dl class="card-body">
			<dt class="label"><label class="label-text" for="postFile" /></dt>
			<!-- bind:this gets the reference to the HTML element-->
			<dd>
				<input
					bind:files
					id="postFile"
					name="postFile"
					class="input"
					type="file"
					accept=".png,.jpg,.mp4"
				/>
			</dd>

			<dt class="label"><label class="label-text" for="displayName">Display Name:</label></dt>
			<dd>
				<input
					type="text"
					class="input input-bordered w-full"
					id="displayName"
					name="displayName"
					placeholder="anon"
					bind:value={displayName}
				/>
			</dd>
			<dt class="label"><label class="label-text" for="postBody">Caption:</label></dt>
			<dd>
				<input
					type="text"
					class="textarea textarea-bordered h-24 w-full"
					id="postBody"
					name="postBody"
					placeholder="Describe please..."
					bind:value={postBody}
				/>
				<!--
			<textarea
				name="postBody"
				id="postBody"
				placeholder="Describe please..."
				class="textarea textarea-bordered h-24 w-full"
			/>
      -->
			</dd>
		</dl>
		<input class="btn" type="submit" />
	</form>
{/if}
