<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Editor from '$lib/components/Editor.svelte';
	import { noteContent } from '$lib/stores/note';
	import { toast } from '$lib/utils/toast';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: {
		if (form?.error) {
			toast.error(form.errors[0].message);
		} else if (form?.success) {
			toast.success('The note was successfully saved !');
		}
	}
</script>

<div class="w-full h-full flex flex-col">
	<div class="h-20 flex items-center px-8">
		<form method="POST" action="?/save">
			<input type="hidden" value={$noteContent} name="content" />
			<Button>Save</Button>
		</form>
	</div>
	<Editor />
</div>
