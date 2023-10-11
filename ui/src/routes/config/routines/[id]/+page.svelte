<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Icon.svelte';
	import Workout from '$lib/components/routines/Workout.svelte';
	import type { Excercise } from '$lib/models/excercise.model';
	import type { Routine, Workout as WorkoutModel } from '$lib/models/routine.model';
	import { excercisesStore } from '$lib/stores/excercises.store';
	import axios from 'axios';
	import { slide } from 'svelte/transition';

	export let data: {
		excercises: Excercise[];
		routine: Routine;
	};

	let isEditingName: boolean = false;
	let newRoutineName: string = data.routine.name;

	async function deleteWorkout(event: CustomEvent<number>) {
		const removedIndex = event.detail - 1;
		const unmodifiedWorkouts = workouts.slice(0, removedIndex);
		const modifiedWorkouts = workouts
			.slice(removedIndex + 1)
			.map((workout: WorkoutModel) => ({ ...workout, number: workout.number - 1 }));

		await updateRoutineWorkouts([...unmodifiedWorkouts, ...modifiedWorkouts]);
	}

	function navigateUpwards() {
		goto('/config/routines');
	}

	async function newWorkout() {
		const nextNumber = workouts.length + 1;
		const newWorkout: WorkoutModel = {
			number: nextNumber,
			excercises: []
		};

		updateRoutineWorkouts([...workouts, newWorkout]);
	}

	function toggleEditModeAndSave() {
		if (newRoutineName !== data.routine.name) {
			const modifiedRoutine = {
				...data.routine,
				name: newRoutineName
			};

			data.routine.name = newRoutineName;
			axios.put(`/routines/${modifiedRoutine.id}`, modifiedRoutine);
		}

		isEditingName = !isEditingName;
	}

	async function updateWorkout(event: CustomEvent<WorkoutModel>) {
		const modifiedWorkouts = [...data.routine.workouts];
		modifiedWorkouts[event.detail.number - 1] = event.detail;

		updateRoutineWorkouts(modifiedWorkouts);
	}

	async function updateRoutineWorkouts(workoutsToModify: WorkoutModel[]) {
		data.routine.workouts = workoutsToModify;

		const modifiedRoutine = {
			...data.routine,
			workouts: workoutsToModify
		};

		await axios.put(`/api/routines`, modifiedRoutine);
	}

	$: excercisesStore.set(data.excercises);
	$: workouts = data.routine.workouts ?? [];
	$: console.log(data);
</script>

<svelte:head>
	<title>{data.routine.name}</title>
	<meta name="description" content="The details of the selected routine" />
</svelte:head>

<div class="page">
	<div class="header">
		<button class="hidden lg:inline-block btn btn-ghost" on:click={navigateUpwards}>
			<Icon icon="arrow-left" size="lg" />
		</button>
		
		{#if !isEditingName}
			<h1 class="page-title">{data.routine.name}</h1>
		{:else}
			<input type="text" bind:value={newRoutineName} class="input input-bordered w-full" />
		{/if}

		<button class="hidden lg:inline-block btn btn-ghost" on:click={toggleEditModeAndSave}>
			<Icon icon="pencil" size="lg" />
		</button>
	</div>

	<div class="workouts">
		{#each workouts as workout}
			<div class="w-100 p-3 lg:w-1/2" transition:slide>
				<Workout {workout} on:change={updateWorkout} on:delete={deleteWorkout} />
			</div>
		{/each}
	</div>

	<button on:click={newWorkout} class="btn w-full">
		<span>Add new workout</span>
	</button>
</div>

<style lang="scss">
	.header {
		display: flex;
		align-items: center;

		@apply gap-3;
	}

	.workouts {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		@apply pb-6 flex-col md:flex-row;
	}
</style>
