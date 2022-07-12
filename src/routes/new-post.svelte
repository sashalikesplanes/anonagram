<script>
	// let postFile;
	// let displayName = '';
	// let postBody = '';
	// let files;
	// let uploadUrl = '';

	// async function handleSubmit() {
		// // get upload URL
		// const response = await fetch('/create-post', {
			// method: 'POST',
			// headers: {
				// 'Content-Type': 'application/json'
			// },
			// body: JSON.stringify({
				// displayName,
				// postBody
			// })
		// });
// 
    // const data = await response.json();
    // uploadUrl = data.url;


		// uploadUrl = await response.json()
		// Upload image to url
  // }
</script>
<!--
{#if uploadUrl}
	<pre>{uploadUrl}</pre>
{/if}

{#if files}
	<pre>{files}</pre>
	<pre>{files.length}</pre>
	<pre>{files[0]}</pre>
	<pre>{files[0].name}</pre>
{/if}
-->
<form
	class="card md:w-192 w-11/12 mx-auto my-3 bg-base-100 shadow-xl"
	action="/create-post"
	method="post"
	enctype="multipart/form-data"
>
  <!--	on:submit|preventDefault={handleSubmit} -->

	<dl class="card-body">
		<dt class="label"><label class="label-text" for="postFile" /></dt>
		<!-- bind:this gets the reference to the HTML element-->
		<dd>
			<input
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
