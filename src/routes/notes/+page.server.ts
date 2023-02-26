import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
	title: z.string().optional(),
	content: z.string()
});

const createFolderSchema = z.object({
	label: z.string()
});

export const actions: Actions = {
	save: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData());

		const data = schema.safeParse(formData);

		if (!data.success) {
			const errors = data.error.errors.map((error) => ({ message: error.message }));
			return fail(400, { error: true, errors });
		}

		const { content } = data.data;

		try {
			await locals.pb.collection('notes').create({ title: 'Hello world', content });
			return { success: true };
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	createFolder: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData());

		const data = createFolderSchema.safeParse(formData);

		if (!data.success) {
			const errors = data.error.errors.map((error) => ({ message: error.message }));
			return fail(400, { error: true, errors });
		}

		const { label } = data.data;

		try {
			await locals.pb.collection('folders').create({ label, user: locals.user?.id });
		} catch (e) {
			console.error(e);
			throw e;
		}
	}
};
