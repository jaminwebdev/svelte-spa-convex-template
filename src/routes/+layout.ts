import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url }) => {
	console.log(url.hash);
};
