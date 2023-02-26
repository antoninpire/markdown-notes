<script lang="ts">
	export let variant: 'default' | 'link' | 'outline' = 'default';
	export let form: string | undefined = undefined;

	const classesByVariant: Record<typeof variant, string> = {
		default: 'hover:bg-btn/80 bg-btn text-white',
		link: 'bg-transparent text-btn hover:text-btn/75',
		outline: 'border border-btn hover:bg-transparent/10 bg-transparent text-headline'
	};

	const classes = classesByVariant[variant];
</script>

<button {form} class={`rounded px-5 py-2 font-semibold ${classes}`} on:click>
	<slot />
</button>
