<script lang="ts">
	import MuscleExcercises from '$lib/components/excercises/MuscleExcercises.svelte';
	import type { Excercise } from '$lib/models/excercise.model.js';
	import { Muscles } from '$lib/models/muscles.enum';
	import { excercisesStore } from '$lib/stores/excercises.store.js';
	import axios from 'axios';

	export let data;

	async function addNewExcercise({detail: excercise}: CustomEvent<Excercise>) {
		await axios.put(`/api/excercises`, excercise);
	}

	$: excercisesStore.set(data.excercises);
</script>

<svelte:head>
	<title>Excercises</title>
	<meta name="description" content="The list of registered excercises" />
</svelte:head>

<h1 class="page-title">Excercises</h1>

<div class="excercises">
	{#each Object.values(Muscles) as muscle}
			<MuscleExcercises {muscle} on:create={addNewExcercise} />
	{/each}
</div>

<style lang="postcss">
	.excercises {
		margin-bottom: 76px;

		display: flex;
		flex-direction: column;

		@apply gap-6;
	}
</style>
