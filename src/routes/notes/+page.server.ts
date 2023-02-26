import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z.object({
	title: z.string().optional(),
	content: z.string()
});

export const actions: Actions = {
	save: async ({ locals, request }) => {
		const currentUser = locals.pb.authStore.model;

		if (currentUser === null)
			return fail(401, { error: true, errors: [{ message: 'Unauthorized' }] });

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
	}
};
