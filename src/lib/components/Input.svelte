<script lang="ts">
	export let id: string | undefined = undefined;
	export let placeholder = '';
	export let disabled = false;
	export let value: string | number = '';
	export let type: 'text' | 'password' | 'number' = 'text';
	export let name: string | undefined = undefined;

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		value = type.match(/^(number|range)$/) ? +target?.value : target?.value;
	};
</script>

<input
	class="p-4 rounded text-headline font-semibold text w-full outline-none bg-transparent border border-gray-700"
	{disabled}
	{placeholder}
	{type}
	{id}
	{name}
	on:input={handleInput}
/>
