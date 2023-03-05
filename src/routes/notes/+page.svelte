<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Editor from '$lib/components/Editor.svelte';
	import { showAddNoteModal } from '$lib/stores/modals';
	import { currentNote, currentNoteContent } from '$lib/stores/note';
	import { toast } from '$lib/utils/toast';

	function onClickAddNote() {
		showAddNoteModal.set(true);
	}

	function onTitleBlur(event: FocusEvent) {
		const target = event.target as HTMLInputElement;
		target.form?.requestSubmit();
	}

	function onTitleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		currentNote.set({
			...$currentNote!,
			title: target.value
		});
	}

	function onClickClose() {
		currentNote.set(undefined);
		currentNoteContent.set('');
	}
</script>

<div class="w-full h-full flex flex-col">
	{#if $currentNote !== undefined}
		<div class="h-20 flex items-center px-8 justify-between">
			<form action="?/renameNote" method="post" use:enhance>
				<input type="hidden" name="id" value={$currentNote.id} />
				<input
					class="text-headline text-5xl bg-transparent outline-none border-none"
					value={$currentNote.title}
					name="title"
					on:change={onTitleChange}
					on:blur={onTitleBlur}
					placeholder="Untitled"
				/>
			</form>
			<div class="flex items-center gap-2">
				<Button variant="outline" on:click={onClickClose}>Close</Button>
				<form
					method="POST"
					action="?/saveNoteContent"
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.type === 'success') {
								toast.success('Note saved !');
								update();
							} else toast.error('Error while saving the note :(');
						};
					}}
				>
					<input type="hidden" value={$currentNoteContent} name="content" />
					<input type="hidden" value={$currentNote.id} name="id" />
					<Button>Save</Button>
				</form>
			</div>
		</div>
		<div class="flex justify-center items-center px-8">
			<div class="h-[1px] bg-gray-600 rounded w-full" />
		</div>
		<Editor />
	{:else}
		<div class="flex flex-col justify-center items-center w-ful h-full">
			<div>
				<h3 class="text-white text-3xl">No Note is Open</h3>
			</div>
			<div class="mt-6 flex flex-col gap-y-2 text-center">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<h3
					class="text-btn hover:text-btn/80 text-2xl hover:cursor-pointer"
					on:click={onClickAddNote}
				>
					Create a Note
				</h3>
				<form
					action="?/getLastUpdatedNote"
					method="post"
					use:enhance={() => {
						return async ({ result }) => {
							if (result.type === 'success' && !!result.data) {
								currentNote.set(result.data);
								currentNoteContent.set(result.data.content);
							} else toast.error('There was an error :/');
						};
					}}
				>
					<button class="text-btn hover:text-btn/80 text-2xl hover:cursor-pointer">
						Open Most Recent Note
					</button>
				</form>
			</div>
		</div>
	{/if}
</div>

<svelte:head>
	<title>Notes</title>
</svelte:head>
