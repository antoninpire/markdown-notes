<script lang="ts">
	import FolderContextMenu from '$lib/components/FolderContextMenu.svelte';
	import NoteContextMenu from '$lib/components/NoteContextMenu.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	// export let form: ActionData;

	// $: {
	// 	if (form?.error) {
	// 		toast.error(form.errors[0].message);
	// 	} else if (form?.success) {
	// 		toast.success('The note was successfully saved !');
	// 	}
	// }
</script>

<div
	class="h-screen gap-1 overflow-y-scroll w-screen bg-background grid grid-cols-[0.18fr_0.82fr] no-scrollbar"
>
	<Sidebar {data} />
	<div><slot /></div>
	<FolderContextMenu />
	<NoteContextMenu />
</div>
