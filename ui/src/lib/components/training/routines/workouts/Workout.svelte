<script lang="ts">
	import type { Workout } from '$lib/models/routine.model';
	import { createEventDispatcher } from 'svelte';
	import Icon from '../../../Icon.svelte';
	import { toCamelCase } from '$lib/pipes/toCamelCase';
	import { toWorkoutDisplayName } from '$lib/pipes/toWorkoutDisplayName';

	export let workout: Workout;

	const dispatch = createEventDispatcher();

	function deleteWorkout() {
		dispatch('delete');
	}
</script>

<div class="workout">
	<div class="workout-header">
		<h2 class="header">{toWorkoutDisplayName(workout)}</h2>

		<button class="btn btn-ghost" on:click={deleteWorkout}>
			<Icon icon="trash" size="lg" />
		</button>
	</div>

	<table class="table table-sm lg:table-lg table-pin-rows border border-primary">
		<thead>
			<tr>
				<th>Name</th>
				<th>Series</th>
				<th>Reps</th>
			</tr>
		</thead>
		<tbody>
			{#each workout.excercises as { excercise, series, reps }}
				<tr>
					<td>{excercise.name}</td>
					<td>{series}</td>
					<td>{reps}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="postcss">
	.workout {
		@apply flex flex-col gap-1;
	}

	.workout-header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		@apply text-2xl;
	}
</style>
