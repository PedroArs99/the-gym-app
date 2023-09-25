<script lang="ts">
	import type { Workout, WorkoutExcercise } from '$lib/models/routine.model';
	import { createEventDispatcher } from 'svelte';
	import AddExcerciseToWorkoutDialog from './AddExcerciseToWorkoutDialog.svelte';
	import Icon from './Icon.svelte';

	export let workout: Workout;

	let dispatch = createEventDispatcher();

	function addNewExcercise(event: CustomEvent<WorkoutExcercise>) {
		const modifiedWorkout = {
			...workout,
			excercises: [...workout.excercises, event.detail]
		};

		dispatch('change', modifiedWorkout);
		isDialogOpen = false;
	}

	function deleteWorkout(workoutNumber: number) {
		dispatch('delete', workoutNumber);
	}

	let isDialogOpen = false;
</script>

<div class="workout-header">
	<!-- TODO: Display muscle groups here-->
	<h2 class="page-header">Workout #{workout.number}</h2>
	<div class="actions">
		<button class="btn btn-ghost" on:click={() => deleteWorkout(workout.number)}>
			<Icon icon="trash" size="lg" />
		</button>
	</div>
</div>

<table class="table table-pin-rows">
	<thead>
		<tr>
			<th>Name</th>
			<th>Series</th>
			<th>Reps</th>
			<th />
		</tr>
	</thead>
	<tbody>
		{#each workout.excercises as { excercise, series, reps }}
			<tr>
				<td>{excercise.name}</td>
				<td>{series}</td>
				<td>{reps}</td>
			</tr>
		{/each}
	</tbody>
</table>

<!-- TODO: Add edit feature-->
<button class="btn w-full" on:click={() => (isDialogOpen = true)}>
	<span>Add Excercise</span>
</button>

<div class="divider opacity-100"></div>

<AddExcerciseToWorkoutDialog {isDialogOpen} on:close={() => (isDialogOpen = false)} on:confirm={addNewExcercise} />

<style lang="postcss">
	.card {
		@apply border border-primary rounded-2xl;
	}

	.workout-header {
		display: flex;
		justify-content: space-between;

		@apply text-2xl;
	}
</style>
