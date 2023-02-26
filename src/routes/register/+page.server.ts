import { fail, redirect, type Actions } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { z } from 'zod';

const schema = z
	.object({
		email: z.string().email({ message: 'The email address is not valid' }),
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters' })
			.max(72, { message: 'Password must be at most 72 characters' }),
		passwordConfirm: z
			.string()
			.min(8, { message: 'Password confirmation must be at least 8 characters' })
			.max(72, { message: 'Password must be at most 72 characters' })
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
			if (e instanceof ClientResponseError)
				return fail(e.status, {
					error: true,
					errors: Object.values(e.data.data).map((d) => ({
						message: (d as { message: string; code: string }).message
					}))
				});
			throw e;
		}

		throw redirect(303, '/notes');
	}
};
