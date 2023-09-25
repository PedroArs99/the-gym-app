<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Workout from '$lib/components/Workout.svelte';
	import type { Excercise } from '$lib/models/excercise.model';
	import type { Routine, Workout as WorkoutModel } from '$lib/models/routine.model';
	import { excercisesStore } from '$lib/stores/excercises.store';
	import axios from 'axios';
	import { slide } from 'svelte/transition';

	export let data: {
		excercises: Excercise[];
		routine: Routine;
	};

	async function newWorkout() {
		const nextNumber = workouts.length + 1;
		const newWorkout: WorkoutModel = {
			number: nextNumber,
			excercises: []
		};

		const upsertedRoutine = {
			...data.routine,
			workouts: [...workouts, newWorkout]
		};

		data.routine = upsertedRoutine;

		await axios.put(`/routines/${upsertedRoutine.id}`, upsertedRoutine);
	}

	// TODO: Save this changes on the backend
	async function updateWorkout(event: CustomEvent<WorkoutModel>) {
		data.routine.workouts[event.detail.number - 1] = event.detail;
		data.routine.workouts = [...data.routine.workouts];
	}

	async function deleteWorkout(event: CustomEvent<number>) {
		const removedIndex = event.detail - 1;
		const unmodifiedWorkouts = workouts.slice(0, removedIndex);

		const modifiedWorkouts = workouts
			.slice(removedIndex + 1)
			.map((workout: WorkoutModel) => ({ ...workout, number: workout.number - 1 }));

		const modifiedRoutine = {
			...data.routine,
			workouts: [...unmodifiedWorkouts, ...modifiedWorkouts]
		};

		await axios.put(`/routines/${modifiedRoutine.id}`, modifiedRoutine);

		workouts = modifiedRoutine.workouts;
	}

	$: excercisesStore.set(data.excercises);
	$: workouts = data.routine.workouts ?? [];
</script>

<svelte:head>
	<title>{data.routine.name}</title>
	<meta name="description" content="The details of the selected routine" />
</svelte:head>

<h1 class="page-title">{data.routine.name}</h1>

<div class="workouts">
	{#each workouts as workout}
		<div transition:slide>
			<Workout {workout} on:change={updateWorkout} on:delete={deleteWorkout} />
		</div>
	{/each}
</div>

<button on:click={newWorkout} class="btn">
	<span>Add new workout</span>
</button>

<style lang="postcss">
	.workouts {
		display: flex;
		flex-direction: column;

		@apply pb-6 gap-6;
	}
</style>
