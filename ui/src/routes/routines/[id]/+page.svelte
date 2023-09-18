<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Workout from '$lib/components/routines/Workout.svelte';
	import type { Routine, Workout as WorkoutModel } from '$lib/models/routine.model';

	export let data: {
		routine: Routine;
	};

	let workouts = data.routine.workouts ?? [];

	function newWorkout() {
		const nextNumber = workouts.length + 1;
		const newWorkout: WorkoutModel = {
			number: nextNumber,
			excercises: []
		};

		workouts = [...workouts, newWorkout];
	}
</script>

<svelte:head>
	<title>{data.routine.name}</title>
	<meta name="description" content="The details of the selected routine" />
</svelte:head>

<h1 class="page-title">{data.routine.name}</h1>

{#each workouts as workout}
	<Workout {workout} />
{/each}

<button on:click={newWorkout} class="btn sticky bottom-0">
	<Icon icon="plus" />
</button>
