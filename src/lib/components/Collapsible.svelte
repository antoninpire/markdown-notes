<script lang="ts">
	import chevronDown from '$lib/icons/chevron-down.svg?raw';
	import chevronRight from '$lib/icons/chevron-right.svg?raw';
	import Icon from 'svelte-icon/Icon.svelte';

	export let label = '';
	let expanded = false;
</script>

<div class="">
	<button
		class="bg-transparent text-headline py-[2px] flex gap-2 items-center w-full border-none m-0 rounded hover:bg-white/10"
		aria-expanded={expanded}
		on:click={() => (expanded = !expanded)}
	>
		<Icon data={expanded ? chevronDown : chevronRight} stroke="white" fill="transparent" />
		{label}
	</button>

	<div class={`${expanded ? '' : 'hidden'} ml-6 text-headline`}>
		<slot />
	</div>
</div>

<style>
	button[aria-expanded='true'] {
		border-bottom: 1px solid var(--gray-light, #eee);
	}
</style>
