import { fail, redirect, type Actions } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { z } from 'zod';

const schema = z.object({
	email: z.string().email({ message: 'The email address is not valid' }),
	password: z.string()
});

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData());

		const data = schema.safeParse(formData);

		if (!data.success) {
			const errors = data.error.errors.map((error) => ({ message: error.message }));
			return fail(400, { error: true, errors });
		}

		const { email, password } = data.data;

		try {
			await locals.pb.collection('users').authWithPassword(email, password);
		} catch (e) {
			if (e instanceof ClientResponseError)
				return fail(e.status, { error: true, errors: [{ message: e.message }] });
			throw e;
		}

		throw redirect(303, '/');
	}
};
