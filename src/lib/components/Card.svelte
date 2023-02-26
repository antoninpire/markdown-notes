<script lang="ts">
	export let className: string | undefined = undefined;
	export let variant: 'default' | 'secondary' = 'default';
</script>

<div
	class={`rounded shadow-md flex-col flex gap-y-3 text-headline ${
		variant === 'default' ? 'bg-card' : 'bg-background'
	} ${className}`}
>
	<slot />
</div>
