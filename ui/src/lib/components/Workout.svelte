<script lang="ts">
	import type { Workout, WorkoutExcercise } from '$lib/models/routine.model';
	import { createEventDispatcher } from 'svelte';
	import AddExcerciseToWorkoutDialog from './AddExcerciseToWorkoutDialog.svelte';
	import Icon from './Icon.svelte';

	export let workout: Workout;

  let dispatch = createEventDispatcher();

  function addNewExcercise(event: CustomEvent<WorkoutExcercise>) {
    const modifiedWorkout = {
      ...workout,
      excercises: [...workout.excercises, event.detail]
    }

    dispatch('change', modifiedWorkout);
    isDialogOpen = false;
  }

	let isDialogOpen = true;
</script>

<div class="card">
	<div class="card-body">
		<div class="card-title">Workout #{workout.number}</div>
		<div class="excercises">
      <ul>
        {#each workout.excercises as {excercise, series, reps} }
          <li>{excercise.name}: {series} x {reps}</li>
        {/each}
      </ul>

			<button class="btn w-full" on:click={() => (isDialogOpen = true)}>
				<Icon icon="plus" />
			</button>
		</div>
	</div>
</div>

<AddExcerciseToWorkoutDialog {isDialogOpen} on:close={() =>isDialogOpen = false} on:confirm={addNewExcercise} />

<style lang="postcss">
	.card {
		@apply border border-primary rounded-2xl;
	}

	.card-title {
		@apply text-2xl;
	}
</style>
