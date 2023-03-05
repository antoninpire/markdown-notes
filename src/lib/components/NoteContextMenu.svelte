<script lang="ts">
	import { enhance } from '$app/forms';
	import copy from '$lib/icons/copy.svg?raw';
	import trash from '$lib/icons/trash.svg?raw';
	import { noteContextMenu } from '$lib/stores/context-menus';
	import { currentNote, currentNoteContent } from '$lib/stores/note';
	import { toast } from '$lib/utils/toast';
	import Icon from 'svelte-icon/Icon.svelte';

	function closeMenu() {
		noteContextMenu.set({
			x: 0,
			y: 0,
			visible: false,
			id: ''
		});
	}
</script>

{#if $noteContextMenu.visible}
	<div
		class="absolute w-44 rounded-lg bg-background flex flex-col !z-[999] border-[0.25px] border-gray-700"
		style="top: {$noteContextMenu.y}px; left: {$noteContextMenu.x}px;"
	>
		<!-- <button
			class="px-2 py-2 w-full hover:bg-white/5 text-headline flex items-center gap-2 hover:cursor-pointer"
		>
			<Icon data={edit} stroke="white" fill="transparent" />
			<span>Rename</span>
		</button> -->
		<!-- <form action="?/createCopy" method="post">
			<input name="id" type="hidden" value={$noteContextMenu.id} /> -->
		<button
			form="create-copy-form"
			class="px-2 py-2 w-full hover:bg-white/5 text-headline flex items-center gap-2 hover:cursor-pointer"
			on:click|stopPropagation
		>
			<Icon data={copy} stroke="white" fill="transparent" />
			<span>Create Copy</span>
		</button>
		<!-- </form> -->
		<hr class="text-gray-700 border-gray-700" />
		<button
			form="delete-note-form"
			class="px-2 py-2 w-full hover:bg-white/5 text-headline flex items-center gap-2 hover:cursor-pointer hover:text-red-400"
			on:click|stopPropagation
		>
			<Icon data={trash} fill="transparent" />
			<span>Delete</span>
		</button>
	</div>
{/if}

<form
	action="?/createCopy"
	method="post"
	id="create-copy-form"
	use:enhance={() => {
		return async ({ result, update }) => {
			if (result.type === 'success' && !!result.data) {
				toast.success('Copy created !');
				currentNote.set(result.data);
				currentNoteContent.set(result.data.content);
				noteContextMenu.set({
					...$noteContextMenu,
					visible: false
				});
			} else toast.error('Error while creating a copy');
			update();
		};
	}}
>
	<input name="id" type="hidden" value={$noteContextMenu.id} />
</form>

<form
	action="?/deleteNote"
	method="post"
	id="delete-note-form"
	use:enhance={() => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				toast.success('Note deleted w/ success !');
				noteContextMenu.set({
					...$noteContextMenu,
					visible: false
				});
				if ($currentNote?.id === result.data) {
					currentNote.set(undefined);
					currentNoteContent.set('');
				}
			} else toast.error('Error while deleting the note');
			update();
		};
	}}
>
	<input name="id" type="hidden" value={$noteContextMenu.id} />
</form>

<svelte:window on:click={closeMenu} />
