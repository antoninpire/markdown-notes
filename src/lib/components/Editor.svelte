<script lang="ts">
	import { currentNoteContent } from '$lib/stores/note';
	import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
	import { listener, listenerCtx } from '@milkdown/plugin-listener';
	import { commonmark } from '@milkdown/preset-commonmark';
	import { replaceAll } from '@milkdown/utils';

	import { nord } from '@milkdown/theme-nord';
	import { onDestroy } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';

	let editor: Promise<Editor>;
	let hasBeenUpdated = false;
	let unsubscribe: Unsubscriber | undefined = undefined;

	function createEditor(dom: HTMLDivElement) {
		editor = Editor.make()
			.config((ctx) => {
				ctx.set(rootCtx, dom);
				ctx.set(defaultValueCtx, $currentNoteContent ?? '');
				ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
					// noteContent.set(markdown);
					currentNoteContent.set(markdown);
					hasBeenUpdated = true;
				});
			})
			.config(nord)
			.use(commonmark)
			.use(listener)
			.create();

		editor.then((e) => {
			// unsubscribe = noteContent.subscribe((content) => {
			// 	e.action(replaceAll(content));
			// 	hasBeenUpdated = false;
			// });
			unsubscribe = currentNoteContent.subscribe((curr) => {
				e.action(replaceAll(curr ?? ''));
				hasBeenUpdated = false;
			});
		});
	}

	if (unsubscribe) onDestroy(unsubscribe);
</script>

<div
	use:createEditor
	class="w-full no-scrollbar overflow-y-scroll prose px-8 prose-h1:text-markdown-h1 prose-a:text-blue-500 prose-a:cursor-pointer prose-p:my-1 prose-h1:my-3 prose-p:text-main prose-strong:text-btn prose-ul:my-2 prose-ul:leading-5 prose-p:leading-7 prose-headings:my-2 prose-h2:text-markdown-h2 prose-h3:text-markdown-h3 prose-h4:text-markdown-h4 prose-h5:text-markdown-h5 prose-h6:text-main prose-h2:text-[1.9em] prose-h3:text-[1.65em] prose-h4:text-[1.4em] prose-h5:text-[1.1em] prose-h6:text-[0.9em]"
/>
