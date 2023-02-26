import type { Folder, Note } from '$lib/types/db';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad<{
	notes: Note[];
	folders: Folder[];
}> = async ({ locals }) => {
	if (!locals.user) throw fail(401);

	const folders = (
		await locals.pb.collection('folders').getList(undefined, undefined, {
			filter: `user.id="${locals.user.id}"`,
			sort: 'label',
			expand: 'notes(folder)'
		})
	).items;

	const notes = (
		await locals.pb.collection('notes').getList(undefined, undefined, {
			filter: `user.id="${locals.user.id}" && folder=null`,
			expand: 'user'
		})
	).items;

	const ret = JSON.parse(
		JSON.stringify({
			folders,
			notes
		})
	) as {
		notes: Note[];
		folders: Folder[];
	};

	return ret;
};
