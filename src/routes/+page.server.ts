import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// if (locals.user) throw redirect(303, '/notes');
	// // TO REMOVE
	// else throw redirect(303, '/login');
};
