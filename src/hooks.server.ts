import { pb } from '$lib/pocketbase';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const PUBLIC_ROUTES = ['login', 'register'];
	const PRIVATE_ROUTES = ['notes'];

	pb.authStore.loadFromCookie(event.request.headers.get('cookie') ?? '');
	if (pb.authStore.isValid) {
		try {
			await pb.collection('users').authRefresh();
		} catch (e) {
			pb.authStore.clear();
		}
	}

	event.locals.pb = pb;
	event.locals.user = JSON.parse(JSON.stringify(pb.authStore.model));

	// Redirect if attempt to access protected route while not logged in
	if (
		!event.locals.user &&
		PRIVATE_ROUTES.some((route) => event.url.pathname.startsWith(`/${route}`))
	)
		throw redirect(303, '/login');
	// Redirect if attempt to access public route while logged in
	else if (
		!!event.locals.user &&
		PUBLIC_ROUTES.some((route) => event.url.pathname.startsWith(`/${route}`))
	)
		throw redirect(303, '/notes');

	const response = await resolve(event);

	response.headers.set('set-cookie', pb.authStore.exportToCookie({ httpOnly: false }));

	return response;
};
