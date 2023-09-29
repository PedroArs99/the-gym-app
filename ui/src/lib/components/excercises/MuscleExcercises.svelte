<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { Muscles } from '$lib/models/muscles.enum';
	import { excercisesStore } from '$lib/stores/excercises.store';

	export let muscle: Muscles;

	let isDialogOpen = false;
	let dispatch = createEventDispatcher();

	$: excercises = $excercisesStore.filter((excercise) => excercise.muscle === muscle);
</script>

<div class="workout-header">
	<h2 class="page-header">{muscle}</h2>
</div>

<table class="table table-pin-rows">
	<thead>
		<tr>
			<th>Name</th>
			<th />
		</tr>
	</thead>
	<tbody>
		{#each excercises as excercise}
			<tr>
				<td>{excercise.name}</td>
				<td></td>
			</tr>
		{/each}
	</tbody>
</table>

<button class="btn w-full" on:click={() => (isDialogOpen = true)}>
	<span>Add Excercise</span>
</button>

<style lang="postcss">
	.workout-header {
		display: flex;
		justify-content: space-between;

		@apply text-2xl;
	}
</style>
