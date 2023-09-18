<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Workout from '$lib/components/Workout.svelte';
	import type { Routine, Workout as WorkoutModel } from '$lib/models/routine.model';
	import axios from 'axios';
	import { fade } from 'svelte/transition';

	export let data: {
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

	$: workouts = data.routine.workouts ?? [];
</script>

<svelte:head>
	<title>{data.routine.name}</title>
	<meta name="description" content="The details of the selected routine" />
</svelte:head>

<h1 class="page-title">{data.routine.name}</h1>

<div class="workouts">
	{#each workouts as workout}
		<div transition:fade>
			<Workout {workout} />
		</div>
	{/each}
</div>

<button on:click={newWorkout} class="btn">
	<Icon icon="plus" />
</button>

<style lang="postcss">
	.workouts {
		display: flex;
		flex-direction: column;

		@apply pb-6 gap-6;
	}
</style>
