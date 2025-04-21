import type { ServerInit } from '@sveltejs/kit';

// This function runs once, when the server is created or the app starts in the browser
// it is a useful place to do asynchronous work such as initializing a database connection.
// this will delay hydration
export const init: ServerInit = async () => {
	console.log('init hook running - do db inits here');
};
