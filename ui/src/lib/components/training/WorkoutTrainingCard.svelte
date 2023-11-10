<script lang="ts">
	import type { Workout } from '$lib/models/routine.model';
	import { toWorkoutDisplayName } from '$lib/pipes/toWorkoutDisplayName';
	import { createEventDispatcher } from 'svelte';

	export let workout: Workout;
	let dispatch = createEventDispatcher()

	function onStartTraining() {
		dispatch('startTraing')
	}
</script>

<div class="workout-training-card">
	<div class="card-body gap-3">
		<h2 class="card-title">{toWorkoutDisplayName(workout)}</h2>
		<ul class="excercises">
			{#each workout.excercises as { excercise, series, reps }}
				<li>{excercise.name} - {series} x {reps}</li>
			{/each}
		</ul>
		<button class="btn btn-primary" on:click={onStartTraining}>Start training</button>
	</div>
</div>

<style>
	.excercises {
		flex-grow: 1;
	}

	.workout-training-card {
		flex-grow: 1;

		@apply card card-compact card-bordered border-primary;
	}
</style>
