import { invalidate } from '$app/navigation';
import { page } from '$app/stores';

export const enhance = (form, callback) => {
  // TODO Add stuff to refill the form 
	let invalidatePath;

	// make sure that invalidatePath is updated whenever the page changes
	page.subscribe((path) => (invalidatePath = path.url));

	async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch(form.action, {
      method: form.method,
      headers: { accept: 'application/json' },
      body: new FormData(form)
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }


    if (callback) callback();
    const url = new URL(invalidatePath);
    await invalidate(url.href);

  }

  form.addEventListener('submit', handleSubmit);

  return {
    destroy() {
      form.removeEventListener('submit', handleSubmit);
    }
  };
};