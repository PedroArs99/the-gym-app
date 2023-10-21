<script lang="ts">
	import type { Muscles } from '$lib/models/muscles.enum';
	import { createEventDispatcher } from 'svelte';
	import Dialog from '../../Dialog.svelte';
	import type { Excercise } from '$lib/models/excercise.model';

	type FormState = {
		muscle: Muscles;
		name: string;
	};

	export let id: string;
	export let isDialogOpen: boolean;
	export let muscle: Muscles;

	let dispatch = createEventDispatcher();

	let formState: FormState = {
		muscle,
		name: ''
	};

	function createExcercise() {
		const excercise: Excercise = {
			name: formState.name,
			muscle: formState.muscle
		};

		dispatch('save', excercise);
	}

	$: isFormStateValid = formState.muscle && formState.name.length > 0;
</script>

<Dialog dialogId={id} {isDialogOpen} on:close>
	<h3 class="font-bold text-lg mb-3">Add new Excercise</h3>

	<div class="form-control w-full">
		<label for="muscle" class="label">Muscle</label>
		<input type="text" name="muscle" bind:value={formState.muscle} disabled class="input input-bordered" />
	</div>

	<div class="form-control w-full">
		<label for="name" class="label">Name</label>
		<!-- svelte-ignore a11y-autofocus -->
		<input type="text" name="name" bind:value={formState.name} autofocus class="input input-bordered" />
	</div>

	<button class="btn btn-primary w-full" disabled={!isFormStateValid} on:click={createExcercise}>Save</button>
</Dialog>

<style lang="postcss">
</style>
