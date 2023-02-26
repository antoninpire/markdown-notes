<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<div
	class="h-screen gap-1 overflow-y-scroll w-screen bg-background grid grid-cols-[0.18fr_0.82fr] no-scrollbar"
>
	<Sidebar {data} />
	<div><slot /></div>
</div>
