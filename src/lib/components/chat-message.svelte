<script>
  export let displayName, messageText, postedOn;
</script>

<li class="card w-11/12 max-w-3xl mx-auto my-3 bg-base-100 shadow-xl">
  <div class="card-body">
    <p>{messageText}</p>
    <div class="flex justify-between">
      <p>{displayName}</p>
      <p class="text-right">{postedOn}</p>
    </div>
  </div>
</li>
