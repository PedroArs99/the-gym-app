<script lang="ts">
	import TrainingHistoryCard from '$lib/components/training/TrainingHistoryCard.svelte';
	import Spinner from '$lib/components/utils/Spinner.svelte';
	import type { Training } from '$lib/models/training.model';
	import { now, parseDate } from '$lib/utils/date-utils';
	import type { Dayjs } from 'dayjs';
	import { onMount } from 'svelte';

	type PageData = {
		trainings: Training[];
	};

	export let data: PageData;
	let weekTrainings: Map<Dayjs, Training | undefined> = new Map();

	onMount(() => {
		weekTrainings = new Map();
		const lastSunday = now().subtract(now().day(), 'day');
		const weekDays = [...Array(7).keys()].map((i) => lastSunday.add(i, 'day'));

		weekDays.forEach((weekDay) => {
			const training = data.trainings.find(
				(t) => parseDate(t.date).format('DD-MM-YYYY') === weekDay.format('DD-MM-YYYY')
			);
			weekTrainings.set(weekDay, training);
		});
	});

	$: console.log(weekTrainings);
</script>

<div class="page">
	<h1 class="page-title">Trainings</h1>

	<div class="trainings">
		{#each weekTrainings.entries() as [date, training]}
			<TrainingHistoryCard {date} {training} />
		{/each}
	</div>
</div>

<Spinner />

<style lang="scss">
	.trainings {
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		gap: 0.75rem;
	}
</style>
