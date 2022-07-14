export const get = () => {
	return {
		status: 302,
	  headers: { location: '/posts' }
	};
};
