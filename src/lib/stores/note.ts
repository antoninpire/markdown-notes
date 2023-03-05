import type { Note } from '$lib/types/db';
import { writable } from 'svelte/store';

export const currentNote = writable<Note | undefined>();
export const currentNoteContent = writable('');
