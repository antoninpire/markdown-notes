<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import { currentUser } from '$lib/pocketbase';

	$: {
		if (!!browser) {
			if (!!$currentUser?.email) goto('/notes');
			// else goto('/login');
		}
	}
</script>

<div class="w-full h-screen flex justify-center items-center bg-background">
	<div>
		<h1 class="text-headline text-5xl">A simple Markdown note editor</h1>
		<div class="mt-3 flex items-center justify-center gap-4">
			<a href="/register"> <Button variant="outline">Register</Button></a>
			<a href="/login"> <Button>Login</Button></a>
		</div>
	</div>
</div>
