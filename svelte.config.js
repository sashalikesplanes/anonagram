import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
      $components: 'src/lib/components', 
      $utils: 'src/lib/utils',
    },
    methodOverride: {
      allowed: ['PUT', 'PATCH', 'DELETE']
    }
	}
};

export default config;
