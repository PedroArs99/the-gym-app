<script lang="ts">
	import type { Workout } from '$lib/models/routine.model';
	import { toWorkoutDisplayName } from '$lib/pipes/toWorkoutDisplayName';

	export let workout: Workout;
</script>

<div class="workout-training-card">
	<div class="card-body gap-3">
		<h2 class="card-title">{toWorkoutDisplayName(workout)}</h2>
		<ul class="excercises">
			{#each workout.excercises as { excercise, series, reps }}
				<li>{excercise.name} - {series} x {reps}</li>
			{/each}
		</ul>
		<!-- <button class="btn btn-primary">Start training</button> -->
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
