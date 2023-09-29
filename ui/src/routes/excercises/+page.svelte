<script lang="ts">
	import MuscleExcercises from '$lib/components/excercises/MuscleExcercises.svelte';
	import { Muscles } from '$lib/models/muscles.enum';
	import { excercisesStore } from '$lib/stores/excercises.store.js';
	import { slide } from 'svelte/transition';

	export let data;

	$: excercisesStore.set(data.excercises);
</script>

<svelte:head>
	<title>Excercises</title>
	<meta name="description" content="The list of registered excercises" />
</svelte:head>

<h1 class="page-title">Excercises</h1>

<div class="excercises">
	{#each Object.values(Muscles) as muscle}
		<div class="w-100 p-3 lg:w-1/2" transition:slide>
			<MuscleExcercises {muscle} />
		</div>
	{/each}
</div>

<style lang="postcss">
	.excercises {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		@apply pb-6 flex-col lg:flex-row;
	}
</style>
