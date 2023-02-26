<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import FolderView from '$lib/components/FolderView.svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import filePlus from '$lib/icons/file-plus.svg?raw';
	import folderPlus from '$lib/icons/folder-plus.svg?raw';
	import { pb } from '$lib/pocketbase';
	import { noteContent } from '$lib/stores/note';
	import Icon from 'svelte-icon/Icon.svelte';
	import type { PageData } from '../../routes/notes/$types';

	export let data: PageData;

	function setNoteContent(content: string) {
		noteContent.set(content);
	}
</script>

<nav
	class="sticky top-0 h-screen overflow-y-auto w-full bg-card flex flex-col justify-between no-scrollbar"
>
	<div class="h-[90%] py-3">
		<div class="items-center flex pl-4">
			<IconButton label="New Note">
				<Icon data={filePlus} stroke="white" fill="transparent" />
			</IconButton>
			<IconButton label="New Folder">
				<Icon data={folderPlus} stroke="white" fill="transparent" />
			</IconButton>
		</div>
		<div class="pl-6 pr-3 mt-3 no-scrollbar overflow-scroll">
			<h3 class="text-headline uppercase -ml-1 mb-1">your notes</h3>
			{#each data.folders as folder}
				<FolderView {folder} />
			{/each}
			{#each data.notes as note}
				<button
					class="ml-1 bg-transparent pl-2 text-headline py-[2px] flex gap-2 items-center w-full border-none m-0 rounded hover:bg-white/10 mt-1"
					on:click={() => setNoteContent(note.content ?? '')}
				>
					{note.title}
				</button>
			{/each}
		</div>
	</div>
	<div class="flex justify-center items-center h-[10%]">
		<form
			method="POST"
			action="/logout"
			use:enhance={() => {
				return async ({ result }) => {
					pb.authStore.clear();
					await applyAction(result);
				};
			}}
		>
			<Button>Logout</Button>
		</form>
	</div>
</nav>
