<script>
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import '../app.css';
</script>

<main class="w-screen min-h-screen">
	<slot />
	<SvelteToast />
</main>

<style>
	:root {
		--toastContainerTop: auto;
		--toastContainerRight: auto;
		--toastContainerBottom: 3rem;
		--toastContainerLeft: calc(50vw - 3rem);
	}

	@font-face {
		font-family: 'Proxima';
		font-style: normal;
		font-weight: 500;
		src: url('/fonts/proxima.otf') format('opentype');
	}
</style>
