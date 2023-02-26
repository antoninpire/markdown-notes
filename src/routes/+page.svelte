<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { currentUser } from '$lib/pocketbase';

	$: {
		if (!!browser) {
			if (!!$currentUser?.email) goto('/notes');
			else goto('/login');
		}
	}
</script>

<div class="w-full h-screen flex justify-center items-center">
	<h1 class="text-black">{$currentUser?.email}</h1>
</div>
