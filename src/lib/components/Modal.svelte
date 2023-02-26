<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	export let showModal = false; // boolean

	let dialog: HTMLDialogElement; // HTMLDialogElement

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="max-w-[32em] min-w-[24em] rounded border-none outline-none p-0 bg-card"
>
	<div on:click|stopPropagation class="p-1">
		<div class="text-3xl text-headline font-semibold flex py-5 justify-center items-center">
			<slot name="header" />
		</div>
		<div class="px-4">
			<slot />
		</div>
		<!-- svelte-ignore a11y-autofocus -->
		<!-- <button autofocus on:click={() => dialog.close()}>close modal</button> -->
		<div class="py-5 flex justify-center items-center gap-2 px-4">
			<!-- svelte-ignore a11y-autofocus -->
			<Button variant="outline" on:click={() => dialog.close()}>Close</Button>
			<slot name="footer" />
		</div>
	</div>
</dialog>

<style>
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.8);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
