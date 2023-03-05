import type { Folder } from '$lib/types/db';
import { writable } from 'svelte/store';

export const showAddFolderModal = writable(false);
export const showAddNoteModal = writable(false);
export const showRenameFolderModal = writable(false);
export const renameFolderInfo = writable<Folder | undefined>();
