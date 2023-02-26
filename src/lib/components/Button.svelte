<script lang="ts">
	export let variant: 'default' | 'link' = 'default';
</script>

<button
	class={`rounded px-5 py-2 font-semibold ${
		variant === 'default'
			? 'hover:bg-btn/80 bg-btn text-white'
			: 'bg-transparent text-btn hover:text-btn/75'
	}`}
>
	<slot />
</button>
