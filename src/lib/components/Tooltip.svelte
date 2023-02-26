<script lang="ts">
	export let label = '';
	let isHovered = false;
	let x = 0;
	let y = 0;

	function mouseOver(event: MouseEvent) {
		isHovered = true;
		x = event.pageX + 15;
		y = event.pageY + 15;
	}
	function mouseMove(event: MouseEvent) {
		x = event.pageX + 15;
		y = event.pageY + 15;
	}
	function mouseLeave() {
		isHovered = false;
	}
</script>

<div on:mouseover={mouseOver} on:mouseleave={mouseLeave} on:mousemove={mouseMove} on:focus>
	<slot />
</div>

{#if isHovered}
	<div
		style="top: {y}px; left: {x}px;"
		class="border border-gray-200 shadow bg-headline rounded p-1 absolute"
	>
		{label}
	</div>
{/if}
