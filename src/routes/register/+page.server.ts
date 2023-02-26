import { fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

const schema = z
	.object({
		email: z.string().email({ message: 'The email address is not valid' }),
		password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
		passwordConfirm: z
			.string()
			.min(6, { message: 'Password confirmation must be at least 6 characters' })
	})
	.refine((data) => data.password === data.passwordConfirm, { message: "Passwords don't match" });

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
			await locals.pb.collection('users').create(data.data);
			await locals.pb.collection('users').authWithPassword(email, password);
		} catch (e) {
			console.error(e);
			throw e;
		}

		throw redirect(303, '/');
	}
};
