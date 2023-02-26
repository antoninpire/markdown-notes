import { writable } from 'svelte/store';

type ContextMenu = {
	x: number;
	y: number;
	visible: boolean;
	id: string;
};

export const folderContextMenu = writable<ContextMenu>({
	x: 0,
	y: 0,
	visible: false,
	id: ''
});

export const noteContextMenu = writable<ContextMenu>({
	x: 0,
	y: 0,
	visible: false,
	id: ''
});
