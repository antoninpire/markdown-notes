<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Editor from '$lib/components/Editor.svelte';
	import { noteContent } from '$lib/stores/note';
</script>

<div class="w-full h-full flex flex-col">
	<div class="h-20 flex items-center px-8">
		<form method="POST" action="?/save" use:enhance>
			<input type="hidden" value={$noteContent} name="content" />
			<Button>Save</Button>
		</form>
	</div>
	<Editor />
</div>

<svelte:head>
	<title>Notes</title>
</svelte:head>
