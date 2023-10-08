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

<table class="table table-sm lg:table-lg table-pin-rows border border-primary">
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
		{#each workout.excercises as { excercise, series, reps }, index}
			<tr>
				<td>{excercise.name}</td>
				<td>{series}</td>
				<td>{reps}</td>
				<td>TODO kg</td>
				<td class="dropdown dropdown-left">
					<button class="btn btn-sm btn-ghost">
						<Icon icon="ellipsis-vertical" />
					</button>
					<ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box border items-start">
						<li class="w-full">
							<button class="btn btn-sm btn-ghost justify-start">
								<Icon icon="trash" /> Delete
							</button>
						</li>
						<li class="w-full text-left">
							<button class="btn btn-sm btn-ghost justify-start">
								<Icon icon="pencil" /> Edit
							</button>
						</li>
					</ul>
				</td>
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
