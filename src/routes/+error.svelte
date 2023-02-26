<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
</script>

<div
	class="bg-background w-screen h-screen flex flex-col justify-center items-center text-headline"
>
	<div>
		<h1 class="text-7xl text-center">
			{$page.status}
		</h1>
		<h4 class="text-3xl mt-1 text-center">{$page.error?.message}</h4>
	</div>

	<a href="/" class="mt-7">
		<Button>Go Back To Home Page</Button>
	</a>
</div>
