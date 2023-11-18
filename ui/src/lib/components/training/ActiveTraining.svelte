<script lang="ts">
	import type { Workout } from '$lib/models/routine.model';
	import { toWorkoutDisplayName } from '$lib/pipes/toWorkoutDisplayName';
	import { createEventDispatcher } from 'svelte';
	import NumericInput from '../utils/NumericInput.svelte';
	import { TrainingService } from '$lib/services/training.service';
	import { getExcerciseLastLoad, type Excercise } from '$lib/models/excercise.model';

	export let activeWorkout: Workout;
	let dispatch = createEventDispatcher();
	let excerciseLoads = new Map<string, number>();

	function getLastLoadValue(excercise: Excercise): number {
		return excerciseLoads.get(excercise.id!) ?? 0
	}

	function finishTraining() {
		dispatch('finishTraining');
	}

	function saveExcerciseWeight(excerciseId: string | undefined, weight: number) {
		if (!excerciseId) throw Error('ERROR: Excercise ID not defined');

		TrainingService.registerExcerciseLoad(excerciseId, weight);
	}

	$: activeWorkout.excercises.forEach(({ excercise }) => {
		if (!excercise.id) throw Error('ERROR: All excercises associated to a workout must have an id');
		excerciseLoads.set(excercise.id, getExcerciseLastLoad(excercise));
	});
</script>

<div class="active-training">
	<h2 class="page-subtitle">{toWorkoutDisplayName(activeWorkout)}</h2>

	<ul class="excercises">
		{#each activeWorkout.excercises as { excercise, series, reps }}
			<li class="excercise-card">
				<span class="py-2">{excercise.name} - {series} x {reps}</span>

				<span class="label">Weight (kg)</span>
				<NumericInput value={getLastLoadValue(excercise)} on:valueChanged={(e) => saveExcerciseWeight(excercise.id, e.detail)} />
			</li>
			<div class="divider" />
		{/each}
	</ul>

	<button class="btn btn-primary w-full" on:click={finishTraining}>Finish Training</button>
</div>

<style>
	.excercises {
		@apply p-2;
	}

	.excercise-card {
		@apply card;
	}
</style>
