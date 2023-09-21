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
		dispatch('delete', workoutNumber)
	}

	let isDialogOpen = false;
</script>

<div class="card">
	<div class="card-body">
		<div class="card-title">
			<!-- TODO: Display muscle groups here-->
			<span>Workout #{workout.number}</span>
			<div class="actions">
				<button class="btn btn-ghost" on:click={() => deleteWorkout(workout.number)}>
					<Icon icon='trash' size='lg' />
				</button>
			</div>
		</div>

		<!-- TODO:  Introduce a fancy table-->
		<div class="excercises">
			<ul>
				{#each workout.excercises as { excercise, series, reps }}
					<li>{excercise.name}: {series} x {reps}</li>
				{/each}
			</ul>

			<button class="btn w-full" on:click={() => (isDialogOpen = true)}>
				<Icon icon="plus" />
			</button>
			<!-- TODO: Add edit feature-->
		</div>
	</div>
</div>

<AddExcerciseToWorkoutDialog {isDialogOpen} on:close={() => (isDialogOpen = false)} on:confirm={addNewExcercise} />

<style lang="postcss">

	.card {
		@apply border border-primary rounded-2xl;
	}

	.card-title {
		display: flex;
		justify-content: space-between;

		@apply text-2xl;
	}
</style>
