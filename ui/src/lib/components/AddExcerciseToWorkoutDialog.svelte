<script lang="ts">
	import Dialog from './Dialog.svelte';
	import { Muscles } from '$lib/models/muscles.enum';
	import { excercisesStore } from '$lib/stores/excercises.store';
	import { createEventDispatcher } from 'svelte';
	import type { Excercise } from '$lib/models/excercise.model';
	import type { WorkoutExcercise } from '$lib/models/routine.model';

	export let isDialogOpen = false;

	let dispatch = createEventDispatcher();

	let selectedMuscleGroup: Muscles;
	let selectedExcercise: Excercise;
	let series: number = 3;
	let reps: number = 12;

	function addExcerciseToWorkout() {
		const workoutExcercise: WorkoutExcercise = {
			excercise: selectedExcercise,
			series, 
			reps
		}

		dispatch('confirm', workoutExcercise)
	}

	$: selectedMuscleExcercises = $excercisesStore.filter((excercise) => excercise.muscle === selectedMuscleGroup);
</script>

<Dialog dialogId="new-excercise-dialog" {isDialogOpen} on:close>
	<h3 class="font-bold text-lg mb-3">Add new Excercise</h3>

	<select name="muscle" required class="select select-bordered" bind:value={selectedMuscleGroup}>
		<option value={undefined} selected disabled>Muscle</option>
		{#each Object.values(Muscles) as muscle}
			<option value={muscle} on:select={() => (selectedMuscleGroup = muscle)}>{muscle}</option>
		{/each}
	</select>

	{#if selectedMuscleGroup}
		<select name="excercise" required class="select select-bordered" bind:value={selectedExcercise}>
			<option value={undefined} selected disabled>Excercise</option>
			{#each selectedMuscleExcercises as excercise}
				<option value={excercise} on:select={() => (selectedExcercise = excercise)}>{excercise.name}</option>
			{/each}
		</select>

		<div class="form-control w-full max-w-xs">
			<label for="series" class="label">
				<span class="label-text">Series</span>
			</label>
			<input type="number" min="1" max="6" class="input input-bordered w-full max-w-xs" bind:value={series} />
		</div>

		<div class="form-control w-full max-w-xs">
			<label for="series" class="label">
				<span class="label-text">Reps</span>
			</label>
			<input type="number" min="1" max="30" class="input input-bordered w-full max-w-xs" bind:value={reps} />
		</div>
	{/if}

	<button class="btn btn-primary w-full" disabled={!selectedExcercise} on:click={addExcerciseToWorkout}>Save</button>
</Dialog>
