<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import Input from '$lib/components/Input.svelte';
	import { pb } from '$lib/pocketbase';
	import { toast } from '$lib/utils/toast';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: {
		if (form?.error) {
			toast.error(form.errors[0].message);
		}
	}
</script>

<div class="w-full h-screen flex justify-center items-center bg-card">
	<Card
		className="2xl:w-[22vw] xl:w-[28vw] lg:w-[35vw] md:w-[45vw] sm:w-[55vw] w-[80vw] p-8"
		variant="secondary"
	>
		<h1 class="font-bold text-5xl text-center">Register</h1>
		<form
			method="POST"
			use:enhance={() => {
				return async ({ result, form }) => {
					if (form.error) return;
					pb.authStore.loadFromCookie(document.cookie);
					await applyAction(result);
				};
			}}
		>
			<fieldset class="mt-8 flex flex-col gap-y-2">
				<label for="email">Email address</label>
				<Input id="email" name="email" placeholder="test@example.com" />
			</fieldset>
			<fieldset class="mt-4 flex flex-col gap-y-2">
				<label for="password">Password</label>
				<Input id="password" name="password" placeholder="******************" type="password" />
			</fieldset>
			<fieldset class="mt-4 flex flex-col gap-y-2">
				<label for="passwordConfirm">Password Confirmation</label>
				<Input
					id="passwordConfirm"
					name="passwordConfirm"
					placeholder="******************"
					type="password"
				/>
			</fieldset>
			<div class="mt-12 flex justify-center gap-3 items-center">
				<a href="/login">
					<Button variant="link">Login</Button>
				</a>
				<Button>Register</Button>
			</div>
			<!-- {#if form?.error}
				<div class="mt-2 text-red-500 text-sm flex flex-col items-center">
					{#each form.errors as error}
						<span>{error.message}</span>
					{/each}
				</div>
			{/if} -->
		</form>
	</Card>
</div>
