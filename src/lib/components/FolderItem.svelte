<script lang="ts">
	import Collapsible from '$lib/components/Collapsible.svelte';
	import NoteItem from '$lib/components/NoteItem.svelte';
	import chevronDown from '$lib/icons/chevron-down.svg?raw';
	import chevronRight from '$lib/icons/chevron-right.svg?raw';
	import { folderContextMenu } from '$lib/stores/context-menus';
	import type { Folder } from '$lib/types/db';
	import Icon from 'svelte-icon/Icon.svelte';

	export let folder: Folder;
	let expanded = false;

	async function onRightClick(e: MouseEvent) {
		folderContextMenu.set({
			x: e.clientX,
			y: e.clientY,
			visible: true,
			id: folder.id
		});
	}
</script>

<Collapsible bind:expanded>
	<button
		class=" text-headline py-[2px] flex gap-2 items-center w-full m-0 rounded hover:bg-white/10 border-2 {$folderContextMenu.id ===
		folder.id
			? 'bg-white/10 border-gray-400'
			: 'bg-transparent border-transparent'}"
		on:contextmenu|preventDefault={onRightClick}
		slot="trigger"
	>
		<Icon data={expanded ? chevronDown : chevronRight} stroke="white" fill="transparent" />
		{folder.label}
	</button>

	{#each folder?.expand?.['notes(folder)'] ?? [] as note}
		<NoteItem {note} />
	{/each}
</Collapsible>
