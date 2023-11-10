<script lang="ts">
	import type { Workout } from '$lib/models/routine.model';
	import { toWorkoutDisplayName } from '$lib/pipes/toWorkoutDisplayName';
	import { createEventDispatcher } from 'svelte';

	export let activeWorkout: Workout;
	let dispatch = createEventDispatcher();

	function finishTraining() {
		dispatch('finishTraining');
	}
</script>

<div class="active-training">
	<h2 class="page-subtitle">{toWorkoutDisplayName(activeWorkout)}</h2>

	<ul class="excercises">
		{#each activeWorkout.excercises as { excercise, series, reps }}
			<li>{excercise.name} - {series} x {reps}</li>
			<div class="divider" />
		{/each}
	</ul>

	<button class="btn btn-primary w-full" on:click={finishTraining}>Finish Training</button>
</div>

<style>
	.excercises {
		@apply p-2;
	}
</style>
