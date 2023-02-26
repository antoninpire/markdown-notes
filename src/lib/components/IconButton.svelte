<script lang="ts">
	import Tooltip from './Tooltip.svelte';

	export let label: string;
</script>

<Tooltip {label}>
	<button class="p-1 rounded bg-transparent hover:bg-transparent/10">
		<slot />
	</button>
</Tooltip>
