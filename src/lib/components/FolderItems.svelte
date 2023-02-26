<script lang="ts">
	import FolderItem from '$lib/components/FolderItem.svelte';
	import type { Folder } from '$lib/types/db';

	export let folders: Folder[];
</script>

{#each folders as folder}
	<FolderItem {folder} />
{/each}

<!-- <FolderContextMenu /> -->
