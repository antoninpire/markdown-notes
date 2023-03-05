import type { Folder, Note } from '$lib/types/db';
import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

const saveNoteContentSchema = z.object({
	id: z.string(),
	content: z.string()
});

const createFolderSchema = z.object({
	label: z.string()
});

const createNoteSchema = z.object({
	title: z.string()
});

const renameNoteSchema = z.object({ title: z.string(), id: z.string() });

const createCopySchema = z.object({ id: z.string() });

const deleteNoteSchema = z.object({ id: z.string() });

const addNoteToFolderSchema = z.object({ folderId: z.string() });

const deleteFolderSchema = z.object({ id: z.string() });

const getFolderSchema = z.object({ id: z.string() });

const renameFolderSchema = z.object({ id: z.string(), label: z.string() });

export const actions: Actions = {
	saveNoteContent: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData());

		const data = saveNoteContentSchema.safeParse(formData);

		if (!data.success) {
			const errors = data.error.errors.map((error) => ({ message: error.message }));
			return fail(400, { error: true, errors });
		}

		const { content, id } = data.data;

		try {
			await locals.pb.collection('notes').update(id, { content });
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
	},
	createNote: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData());

		const data = createNoteSchema.safeParse(formData);

		if (!data.success) {
			const errors = data.error.errors.map((error) => ({ message: error.message }));
			return fail(400, { error: true, errors });
		}

		const { title } = data.data;

		try {
			await locals.pb.collection('notes').create({ title, user: locals.user?.id });
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	renameNote: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData());

		const data = renameNoteSchema.safeParse(formData);

		if (!data.success) {
			const errors = data.error.errors.map((error) => ({ message: error.message }));
			return fail(400, { error: true, errors });
		}

		const { id, title } = data.data;

		try {
			await locals.pb.collection('notes').update(id, { title });
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	createCopy: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData());

		const data = createCopySchema.safeParse(formData);

		if (!data.success) {
			const errors = data.error.errors.map((error) => ({ message: error.message }));
			return fail(400, { error: true, errors });
		}

		const { id } = data.data;

		try {
			const copyNote = await locals.pb.collection('notes').getOne(id);
			const createdNote = await locals.pb.collection('notes').create({
				title: `Copy of ${copyNote.title.slice(0, 65)}`,
				content: copyNote.content,
				user: locals.user?.id
			});
			return JSON.parse(JSON.stringify(createdNote)) as Note;
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	deleteNote: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData());

		const data = deleteNoteSchema.safeParse(formData);

		if (!data.success) {
			const errors = data.error.errors.map((error) => ({ message: error.message }));
			return fail(400, { error: true, errors });
		}

		const { id } = data.data;

		try {
			await locals.pb.collection('notes').delete(id);
			return id;
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	addNoteToFolder: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData());

		const data = addNoteToFolderSchema.safeParse(formData);

		if (!data.success) {
			const errors = data.error.errors.map((error) => ({ message: error.message }));
			return fail(400, { error: true, errors });
		}

		const { folderId } = data.data;

		try {
			return JSON.parse(
				JSON.stringify(
					await locals.pb.collection('notes').create({
						user: locals.user?.id,
						folder: folderId,
						title: 'Untitled'
					})
				)
			) as Note;
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	getFolder: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData());

		const data = getFolderSchema.safeParse(formData);

		if (!data.success) {
			const errors = data.error.errors.map((error) => ({ message: error.message }));
			return fail(400, { error: true, errors });
		}

		const { id } = data.data;

		try {
			return JSON.parse(JSON.stringify(await locals.pb.collection('folders').getOne(id))) as Folder;
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	renameFolder: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData());

		const data = renameFolderSchema.safeParse(formData);

		if (!data.success) {
			const errors = data.error.errors.map((error) => ({ message: error.message }));
			return fail(400, { error: true, errors });
		}

		const { id, label } = data.data;

		try {
			return JSON.parse(
				JSON.stringify(await locals.pb.collection('folders').update(id, { label }))
			);
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	deleteFolder: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData());

		const data = deleteFolderSchema.safeParse(formData);

		if (!data.success) {
			const errors = data.error.errors.map((error) => ({ message: error.message }));
			return fail(400, { error: true, errors });
		}

		const { id } = data.data;

		try {
			await locals.pb.collection('folders').delete(id);
			return id;
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	getLastUpdatedNote: async ({ locals }) => {
		const note = await locals.pb.collection('notes').getFirstListItem('', { sort: '-updated' });
		console.log('NOTE', note);
		return JSON.parse(JSON.stringify(note));
	}
};
