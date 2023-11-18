<script lang="ts">
	import WorkoutTrainingCard from '$lib/components/training/WorkoutTrainingCard.svelte';
	import ActiveTraining from '$lib/components/training/ActiveTraining.svelte';
	import type { Routine, Workout } from '$lib/models/routine.model';
	import { TrainingService } from '$lib/services/training.service';
	import type { Training } from '$lib/models/training.model';
	import { onMount } from 'svelte';
	import type { Excercise } from '$lib/models/excercise.model';

	type PageData = {
		routine: Routine;
		excercises: Excercise[];
	};

	export let data: PageData;
	let activeTraining: Training | undefined = undefined;

	function finishTraining() {
		TrainingService.finishTraining();
		activeTraining = undefined;
	}

	function startTraining(workout: Workout) {
		TrainingService.startTraining(data.routine.id, workout.id!);
		activeTraining = TrainingService.getActiveTraining();
	}

	onMount(() => {
		activeTraining = TrainingService.getActiveTraining();
	});

	$: activeWorkout = data.routine.workouts.find((w) => w.id === activeTraining?.workoutId);
</script>

<div class="page">
	<h1 class="page-title">Trainings</h1>

	<div class="page-content">
		{#if activeWorkout}
			<ActiveTraining {activeWorkout} on:finishTraining={finishTraining} />
		{:else}
			<h2 class="page-subtitle">Choose a workout</h2>
			<div class="available-workouts">
				{#each data.routine.workouts as workout}
					<WorkoutTrainingCard {workout} on:startTraing={() => startTraining(workout)} />
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.available-workouts {
		display: flex;
		flex-wrap: wrap;

		@apply gap-3;
	}

	.trainings {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		gap: 0.75rem;

		@apply hidden lg:flex;
	}
</style>
