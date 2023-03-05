<script lang="ts">
	import { noteContextMenu } from '$lib/stores/context-menus';
	import { currentNote, currentNoteContent } from '$lib/stores/note';
	import type { Note } from '$lib/types/db';

	export let note: Note;

	function onClick() {
		currentNote.set(note);
		currentNoteContent.set(note.content);
	}

	async function onRightClick(e: MouseEvent) {
		noteContextMenu.set({
			x: e.clientX,
			y: e.clientY,
			visible: true,
			id: note.id
		});
	}

	let border = 'border-transparent';
	let bg = 'bg-transparent';

	$: border = $noteContextMenu.id === note.id ? 'border-gray-400' : 'border-transparent';
	$: bg =
		$noteContextMenu.id === note.id || $currentNote?.id === note.id
			? 'bg-white/10'
			: 'bg-transparent';
</script>

<button
	on:click={onClick}
	class="pl-2 text-headline py-[2px] flex gap-2 items-center w-full border-2 m-0 rounded hover:bg-white/10 {border} {bg}"
	on:contextmenu|preventDefault={onRightClick}
>
	{note.title}
</button>
