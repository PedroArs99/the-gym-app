<script lang="ts">
	import type { Workout, WorkoutExcercise } from '$lib/models/routine.model';
	import { createEventDispatcher } from 'svelte';
	import AddExcerciseToWorkoutDialog from './AddExcerciseToWorkoutDialog.svelte';
	import Icon from '../Icon.svelte';
	import { toCamelCase } from '$lib/pipes/toCamelCase';

	export let workout: Workout;

	let isDialogOpen = false;
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

	$: groups = workout.excercises
		.map(({ excercise }) => excercise.muscle)
		.reduce((acc, currentValue) => (acc.includes(currentValue) ? acc : [...acc, currentValue]), new Array<string>())
		.map((group) => toCamelCase(group));
</script>

<div class="workout-header">
	<h2 class="header">Workout #{workout.number} - {groups}</h2>
	<div class="actions">
		<button class="btn btn-ghost" on:click={() => deleteWorkout(workout.number)}>
			<Icon icon="trash" size="lg" />
		</button>
	</div>
</div>

<table class="table table-pin-rows border border-primary">
	<thead>
		<tr>
			<th>Name</th>
			<th>Series</th>
			<th>Reps</th>
			<th>Weight</th>
			<th />
		</tr>
	</thead>
	<tbody>
		{#each workout.excercises as { excercise, series, reps }}
			<tr>
				<td>{excercise.name}</td>
				<td>{series}</td>
				<td>{reps}</td>
				<td>TODO kg</td>
				<td />
			</tr>
		{/each}
	</tbody>
</table>

<button class="btn w-full" on:click={() => (isDialogOpen = true)}>
	<span>Add Excercise</span>
</button>

<AddExcerciseToWorkoutDialog
	id="add-excercise-{workout.number}"
	{isDialogOpen}
	on:close={() => (isDialogOpen = false)}
	on:confirm={addNewExcercise} />

<style lang="postcss">
	.workout-header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		@apply text-2xl;
	}
</style>
