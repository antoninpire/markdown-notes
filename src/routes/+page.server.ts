import { pb } from '$lib/pocketbase';
import type { Load } from '@sveltejs/kit';

// TODO: not working currently doing it from the client
export const load: Load = async () => {
	if (pb.authStore.isValid)
		return {
			redirect: '/login',
			status: 302
		};
};
