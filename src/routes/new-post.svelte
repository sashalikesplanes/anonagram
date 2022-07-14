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
		const fileId = resJSON.id;
		const fileType = resJSON.type;

		const resCreatePost = await fetch('/posts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				fileUrl,
				displayName,
				postBody,
				fileType,
				fileId
			})
		});
		// TODO check if was succesfully created
		uploading = false;
		goto('/');
	}
</script>

<form
	action="/create-post"
	method="post"
	enctype="multipart/form-data"
	on:submit|preventDefault={handleSubmit}
	class="card w-11/12 max-w-3xl mx-auto my-3 bg-base-100 shadow-xl"
>
	<dl class="card-body relative pb-3">
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
				disabled={uploading}
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
				disabled={uploading}
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
				disabled={uploading}
			/>
		</dd>
		<button
			class={`btn btn-block w-full mx-auto box-border my-3 text-2xl ${uploading ? 'loading' : ''}`}
			type="submit"
		>
			{uploading ? 'Uploading...' : 'Submit'}
		</button>
	</dl>
</form>
