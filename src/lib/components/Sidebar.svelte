<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import FolderItems from '$lib/components/FolderItems.svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import Input from '$lib/components/Input.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import NoteItem from '$lib/components/NoteItem.svelte';
	import filePlus from '$lib/icons/file-plus.svg?raw';
	import folderPlus from '$lib/icons/folder-plus.svg?raw';
	import { pb } from '$lib/pocketbase';
	import Icon from 'svelte-icon/Icon.svelte';
	import type { PageData } from '../../routes/notes/$types';

	export let data: PageData;

	let showAddFolderModal = false;
</script>

<nav
	class="sticky top-0 h-screen overflow-y-auto w-full bg-card flex flex-col justify-between no-scrollbar"
>
	<div class="h-[90%] py-3">
		<div class="items-center flex pl-4">
			<IconButton label="New Note">
				<Icon data={filePlus} stroke="white" fill="transparent" />
			</IconButton>
			<IconButton label="New Folder" on:click={() => (showAddFolderModal = true)}>
				<Icon data={folderPlus} stroke="white" fill="transparent" />
			</IconButton>
		</div>
		<div class="pl-6 pr-3 mt-3 no-scrollbar overflow-scroll">
			<h3 class="text-headline uppercase -ml-1 mb-1">your notes</h3>
			<FolderItems folders={data.folders} />
			{#each data.notes as note}
				<NoteItem {note} />
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
			<Button variant="outline">Logout</Button>
		</form>
	</div>
</nav>

<Modal bind:showModal={showAddFolderModal}>
	<h2 slot="header">Create a Folder</h2>

	<form id="create-folder-form" method="post" action="?/createFolder">
		<div class="text-headline">
			<fieldset class="flex flex-col gap-2">
				<label class="ml-1" for="folder-name">Name of Folder</label>
				<Input placeholder="Example #1" name="label" />
				{#if $page.form?.error}
					{#each $page.form?.errors as err}
						<span class="text-red-500 text-sm text-center font-semibold">
							{err.message}
						</span>
					{/each}
				{/if}
			</fieldset>
		</div>
	</form>

	<Button form="create-folder-form" slot="footer">Create</Button>
</Modal>
