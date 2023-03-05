<script lang="ts">
	import { enhance } from '$app/forms';
	import edit from '$lib/icons/edit.svg?raw';
	import filePlus from '$lib/icons/file-plus.svg?raw';
	import trash from '$lib/icons/trash.svg?raw';
	import { folderContextMenu } from '$lib/stores/context-menus';
	import { renameFolderInfo, showRenameFolderModal } from '$lib/stores/modals';
	import { currentNote, currentNoteContent } from '$lib/stores/note';
	import { toast } from '$lib/utils/toast';
	import Icon from 'svelte-icon/Icon.svelte';

	function closeMenu() {
		folderContextMenu.set({
			x: 0,
			y: 0,
			visible: false,
			id: ''
		});
	}
</script>

{#if $folderContextMenu.visible}
	<div
		class="absolute w-44 rounded-lg bg-background flex flex-col !z-[999] border-[0.25px] border-gray-700"
		style="top: {$folderContextMenu.y}px; left: {$folderContextMenu.x}px;"
	>
		<button
			form="add-note-to-folder-form"
			on:click|stopPropagation
			class="px-2 py-2 w-full hover:bg-white/5 text-headline flex items-center gap-2 hover:cursor-pointer"
		>
			<Icon data={filePlus} stroke="white" fill="transparent" />
			<span>Add Note</span>
		</button>
		<button
			form="rename-folder-fetch-form"
			on:click|stopPropagation
			class="px-2 py-2 w-full hover:bg-white/5 text-headline flex items-center gap-2 hover:cursor-pointer"
		>
			<Icon data={edit} stroke="white" fill="transparent" />
			<span>Rename</span>
		</button>
		<hr class="text-gray-700 border-gray-700" />
		<button
			form="delete-folder-form"
			on:click|stopPropagation
			class="px-2 py-2 w-full hover:bg-white/5 text-headline flex items-center gap-2 hover:cursor-pointer hover:text-red-400"
		>
			<Icon data={trash} fill="transparent" />
			<span>Delete</span>
		</button>
	</div>
{/if}

<form
	action="?/addNoteToFolder"
	method="post"
	id="add-note-to-folder-form"
	use:enhance={() => {
		return async ({ result, update }) => {
			if (result.type === 'success' && !!result.data) {
				toast.success('Note created w/ success !');
				folderContextMenu.set({
					...$folderContextMenu,
					visible: false
				});
				currentNote.set(result.data);
				currentNoteContent.set(result.data.content);
			} else toast.error('Error while creating the note');
			update();
		};
	}}
>
	<input name="folderId" type="hidden" value={$folderContextMenu.id} />
</form>

<form
	action="?/getFolder"
	method="post"
	id="rename-folder-fetch-form"
	use:enhance={() => {
		return async ({ result, update }) => {
			if (result.type === 'success' && !!result.data) {
				folderContextMenu.set({
					...$folderContextMenu,
					visible: false
				});
				renameFolderInfo.set(result.data);
				showRenameFolderModal.set(true);
			} else toast.error('Error while fetching the folder info');
			update();
		};
	}}
>
	<input name="id" type="hidden" value={$folderContextMenu.id} />
</form>

<form
	action="?/deleteFolder"
	method="post"
	id="delete-folder-form"
	use:enhance={() => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				toast.success('Folder deleted w/ success !');
				folderContextMenu.set({
					...$folderContextMenu,
					visible: false
				});
				if ($currentNote?.folder === result.data) {
					currentNote.set(undefined);
					currentNoteContent.set('');
				}
			} else toast.error('Error while deleting the folder');
			update();
		};
	}}
>
	<input name="id" type="hidden" value={$folderContextMenu.id} />
</form>

<svelte:window on:click={closeMenu} />
