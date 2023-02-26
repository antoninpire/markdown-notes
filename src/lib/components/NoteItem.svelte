<script lang="ts">
	import { noteContextMenu } from '$lib/stores/context-menus';
	import { noteContent } from '$lib/stores/note';
	import type { Note } from '$lib/types/db';

	export let note: Note;

	function onClick(content: string) {
		noteContent.set(content);
	}

	async function onRightClick(e: MouseEvent) {
		noteContextMenu.set({
			x: e.clientX,
			y: e.clientY,
			visible: true,
			id: note.id
		});
	}
</script>

<button
	on:click={() => onClick(note.content ?? '')}
	class="pl-2 text-headline py-[2px] flex gap-2 items-center w-full border-2 m-0 rounded hover:bg-white/10 {$noteContextMenu.id ===
	note.id
		? 'bg-white/10 border-gray-400'
		: 'bg-transparent border-transparent'}"
	on:contextmenu|preventDefault={onRightClick}
>
	{note.title}
</button>
