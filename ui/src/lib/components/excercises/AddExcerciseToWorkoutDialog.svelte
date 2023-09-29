<script lang="ts">
	import Dialog from '../Dialog.svelte';
	import { Muscles } from '$lib/models/muscles.enum';
	import { excercisesStore } from '$lib/stores/excercises.store';
	import { createEventDispatcher } from 'svelte';
	import type { Excercise } from '$lib/models/excercise.model';
	import type { WorkoutExcercise } from '$lib/models/routine.model';

	type FormState = {
		selectedMuscleGroup?: Muscles;
		selectedExcercise?: Excercise;
		series: number;
		reps: number;
	};

	const INITIAL_FORM_STATE = {
		selectedMuscleGroup: undefined,
		selectedExcercise: undefined,
		series: 3,
		reps: 12
	};

	export let isDialogOpen = false;
	export let id: string;

	let dispatch = createEventDispatcher();

	let formState: FormState = INITIAL_FORM_STATE;

	function addExcerciseToWorkout() {
		const workoutExcercise: WorkoutExcercise = {
			excercise: formState.selectedExcercise!,
			series: formState.series,
			reps: formState.reps
		};

		dispatch('confirm', workoutExcercise);
	}

	$: selectedMuscleExcercises = $excercisesStore.filter(
		(excercise) => excercise.muscle === formState.selectedMuscleGroup
	);

	$: isFormStateValid = !!formState.selectedExcercise && formState.series > 0 && formState.reps > 0;
</script>

<Dialog dialogId={id} {isDialogOpen} on:close>
	<h3 class="font-bold text-lg mb-3">Add new Excercise</h3>

	<select name="muscle" required class="select select-bordered" bind:value={formState.selectedMuscleGroup}>
		<option value={undefined} selected disabled>Muscle</option>
		{#each Object.values(Muscles) as muscle}
			<option value={muscle} on:select={() => (formState.selectedMuscleGroup = muscle)}>{muscle}</option>
		{/each}
	</select>

	{#if formState.selectedMuscleGroup}
		<select name="excercise" required class="select select-bordered" bind:value={formState.selectedExcercise}>
			<option value={undefined} selected disabled>Excercise</option>
			{#each selectedMuscleExcercises as excercise}
				<option value={excercise} on:select={() => (formState.selectedExcercise = excercise)}>{excercise.name}</option>
			{/each}
		</select>

		<!-- TODO: Introduce fancy Numeric inputs-->
		<div class="form-control w-full">
			<label for="series" class="label">
				<span class="label-text">Series</span>
			</label>
			<input type="number" min="1" max="6" class="input input-bordered w-full" bind:value={formState.series} />
		</div>

		<div class="form-control w-full">
			<label for="series" class="label">
				<span class="label-text">Reps</span>
			</label>
			<input type="number" min="1" max="30" class="input input-bordered w-full" bind:value={formState.reps} />
		</div>
	{/if}

	<button class="btn btn-primary w-full" disabled={!isFormStateValid} on:click={addExcerciseToWorkout}>Save</button>
</Dialog>
