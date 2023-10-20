<script lang="ts">
	import Dialog from '$lib/components/Dialog.svelte';
	import { Muscles } from '$lib/models/muscles.enum';
	import type { WorkoutExcercise } from '$lib/models/routine.model';
	import { toCamelCase } from '$lib/pipes/toCamelCase';
	import { createEventDispatcher } from 'svelte';
	import { excercisesStore as excercises } from '$lib/stores/excercises.store';
	import type { Excercise } from '$lib/models/excercise.model';
	import NumericInput from '$lib/components/utils/NumericInput.svelte';
	import Workout from '$lib/components/routines/Workout.svelte';

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

	export let id: string;
	export let isDialogOpen = false;

	let dispatch = createEventDispatcher();

	let formState: FormState = INITIAL_FORM_STATE;
	let workoutExcercises: WorkoutExcercise[] = [];

	function addNewExcercise() {
    const workoutExcercise: WorkoutExcercise = {
      excercise: formState.selectedExcercise!,
      series: formState.series,
      reps: formState.reps,
    }

    workoutExcercises = [...workoutExcercises, workoutExcercise]
    
    // Clear form state
    formState.selectedExcercise = undefined;
  }

  function saveWorkout() {
    dispatch('save', workoutExcercises)

    formState = INITIAL_FORM_STATE;
    workoutExcercises = []
  }

	$: filteredExcercises = $excercises
		.filter((e) => e.muscle === formState.selectedMuscleGroup)
		.filter((e) => !workoutExcercises.find((we) => we.excercise.id === e.id))
		.sort((a, b) => a.name.localeCompare(b.name));
	$: isFormStateValid = !!formState.selectedExcercise && formState.series > 0 && formState.reps > 0;
</script>

<Dialog dialogId={id} {isDialogOpen} on:close={() => dispatch('close')}>
	<h3 class="font-bold text-lg mb-3">Add new workout</h3>

	<div class="form">
		<select bind:value={formState.selectedMuscleGroup} class="select select-bordered w-full">
			<option value={undefined} disabled selected>Muscle</option>
			{#each Object.keys(Muscles) as muscle}
				<option value={muscle}>{toCamelCase(muscle)}</option>
			{/each}
		</select>

		<select
			bind:value={formState.selectedExcercise}
			class="select select-bordered w-full"
			disabled={formState.selectedMuscleGroup === undefined}>
			<option value={undefined} disabled selected>Excercise</option>
			{#each filteredExcercises as excercise}
				<option value={excercise}>{toCamelCase(excercise.name)}</option>
			{/each}
		</select>

		<div class="form-control w-full">
			<label for="series" class="label">
				<span class="label-text">Series</span>
			</label>
			<NumericInput value={formState.series} on:valueChanged={(e) => (formState.series = e.detail)} />
		</div>

		<div class="form-control w-full">
			<label for="series" class="label">
				<span class="label-text">Reps</span>
			</label>
			<NumericInput value={formState.reps} on:valueChanged={(e) => (formState.reps = e.detail)} />
		</div>

		<button class="btn btn-primary float-right" disabled={!isFormStateValid} on:click={addNewExcercise}>Add</button>
	</div>

	<div class="divider" />

	<div class="preview">
		<h4 class="font-bold mb-3">Workout preview</h4>

		<table class="table table-sm">
			<thead>
				<tr>
					<th>Excercise</th>
					<th>Muscle</th>
					<th>Series</th>
					<th>Reps</th>
				</tr>
			</thead>
			<tbody>
				{#each workoutExcercises as { excercise, series, reps }}
					<tr>
						<td>{excercise.name}</td>
						<td>{excercise.muscle}</td>
						<td>{series}</td>
						<td>{reps}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<button class="btn btn-primary float-right" disabled={workoutExcercises.length === 0} on:click={saveWorkout}>Save</button>
</Dialog>

<style lang="postcss">
	.form {
		display: flex;
		flex-direction: column;
	}

	.preview {
		@apply mb-3;
	}
</style>
