<script lang="ts">
	export let expanded = false;
</script>

<div class="">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:click={() => (expanded = !expanded)}>
		<slot name="trigger" />
	</div>
	<!-- <Folder {expanded} {label} on:click={() => (expanded = !expanded)} /> -->

	<div class={`${expanded ? '' : 'hidden'} ml-6 text-headline`}>
		<slot />
	</div>
</div>
