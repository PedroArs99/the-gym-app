<script lang="ts">
	import Workout from '$lib/components/training/routines/workouts/Workout.svelte';
	import CreateWorkoutDialog from '$lib/components/training/routines/workouts/CreateWorkoutDialog.svelte';
	import type { Excercise } from '$lib/models/excercise.model';
	import type { Routine, WorkoutExcercise } from '$lib/models/routine.model';
	import { excercisesStore } from '$lib/stores/excercises.store';
	import axios from 'axios';
	import { slide } from 'svelte/transition';

	export let data: {
		excercises: Excercise[];
		routine: Routine;
	};

	let isNewWorkoutModalVisible = false;

	async function saveWorkout(event: CustomEvent<WorkoutExcercise[]>) {
		const workoutNumber = workouts.length;
		const newWorkout = {
			number: workoutNumber,
			excercises: event.detail,
		}

		workouts = [...workouts, newWorkout];

		await axios.post(`/api/routines/${data.routine.id}/workouts`, newWorkout);
	}

	$: excercisesStore.set(data.excercises);
	$: workouts = data.routine.workouts ?? [];
</script>

<svelte:head>
	<title>{data.routine.name}</title>
	<meta name="description" content="The details of the selected routine" />
</svelte:head>

<div class="page">
	<div class="header">
		<h1 class="page-title">{data.routine.name}</h1>
	</div>

	<div class="workouts">
		{#each workouts as workout}
			<div class="w-100 p-3 lg:w-1/2" transition:slide>
				<Workout {workout} />
			</div>
		{/each}
	</div>

	<button on:click={() => (isNewWorkoutModalVisible = true)} class="btn w-full">
		<span>Add new workout</span>
	</button>
</div>

<CreateWorkoutDialog
	id="new-workout-dialog"
	isDialogOpen={isNewWorkoutModalVisible}
	on:close={() => (isNewWorkoutModalVisible = false)}
	on:save={saveWorkout} />

<style lang="postcss">
	.workouts {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		@apply pb-6 flex-col md:flex-row;
	}
</style>
