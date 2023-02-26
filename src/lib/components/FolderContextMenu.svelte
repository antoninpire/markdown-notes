<script lang="ts">
	import edit from '$lib/icons/edit.svg?raw';
	import filePlus from '$lib/icons/file-plus.svg?raw';
	import trash from '$lib/icons/trash.svg?raw';
	import { folderContextMenu } from '$lib/stores/context-menus';
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
			class="px-2 py-2 w-full hover:bg-white/5 text-headline flex items-center gap-2 hover:cursor-pointer"
		>
			<Icon data={filePlus} stroke="white" fill="transparent" />
			<span>Add Note</span>
		</button>
		<button
			class="px-2 py-2 w-full hover:bg-white/5 text-headline flex items-center gap-2 hover:cursor-pointer"
		>
			<Icon data={edit} stroke="white" fill="transparent" />
			<span>Rename</span>
		</button>
		<hr class="text-gray-700 border-gray-700" />
		<button
			class="px-2 py-2 w-full hover:bg-white/5 text-headline flex items-center gap-2 hover:cursor-pointer hover:text-red-400"
		>
			<Icon data={trash} fill="transparent" />
			<span>Delete</span>
		</button>
	</div>
{/if}

<svelte:window on:click={closeMenu} />
