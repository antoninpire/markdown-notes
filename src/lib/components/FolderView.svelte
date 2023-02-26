<script lang="ts">
	import Collapsible from '$lib/components/Collapsible.svelte';
	import { noteContent } from '$lib/stores/note';
	import type { Folder } from '$lib/types/db';

	export let folder: Folder;

	function handleClick(content: string) {
		noteContent.set(content);
	}

	// $: console.log('CONTENT', $noteContent);
</script>

<Collapsible label={folder.label}>
	<!-- <slot /> -->
	{#each folder?.expand?.['notes(folder)'] ?? [] as note}
		<button
			on:click={() => handleClick(note.content ?? '')}
			class="bg-transparent pl-2 text-headline py-[2px] flex gap-2 items-center w-full border-none m-0 rounded hover:bg-white/10"
		>
			{note.title}
		</button>
	{/each}
</Collapsible>
