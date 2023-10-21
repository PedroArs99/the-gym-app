<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import type { Muscles } from '$lib/models/muscles.enum';
	import { excercisesStore } from '$lib/stores/excercises.store';
	import CreateExcerciseDialog from './CreateExcerciseDialog.svelte';
	import type { Excercise } from '$lib/models/excercise.model';

	export let muscle: Muscles;

	const dispatch = createEventDispatcher();

	let isDialogOpen = false;

	function createExcercise({ detail: excercise }: CustomEvent<Excercise>) {
		excercisesStore.addNewExcercise(excercise);
		
		dispatch('create', excercise);
		isDialogOpen = false;
	}

	$: excercises = $excercisesStore.filter((excercise) => excercise.muscle === muscle);
</script>

<div class="excercises-container">
	<div class="header">
		<h2 class="page-header">{muscle}</h2>
	</div>

	<table class="table table-pin-rows border border-primary">
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
					<td />
				</tr>
			{/each}
		</tbody>
	</table>

	<button class="btn w-full" on:click={() => (isDialogOpen = true)}>
		<span>Add Excercise</span>
	</button>

	<CreateExcerciseDialog
		id="create-excercise-{muscle}"
		{muscle}
		{isDialogOpen}
		on:close={() => (isDialogOpen = false)}
		on:save={createExcercise} />
</div>

<style lang="postcss">
	.header {
		@apply p-3;
	}
</style>
