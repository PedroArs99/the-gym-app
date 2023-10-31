<script lang="ts">
	import type { Training } from '$lib/models/training.model';
	import { now } from '$lib/utils/date-utils';
	import type { Dayjs } from 'dayjs';
	import { onMount } from 'svelte';

	export let date: Dayjs;
	export let training: Training | undefined;

	let borderColor: 'success' | 'primary' = 'primary';
	let bgColor: 'success' | 'primary-content' = 'primary-content';

	onMount(() => {
		if (training) {
			borderColor = 'success';
			bgColor = 'success';
		}
	});

	$: isToday = date.format('DD-MM-YYYY') === now().format('DD-MM-YYYY');
</script>

<div class="training-history-entry {isToday ? 'jump' : ''}">
	<div class="card card-compact card-bordered w-32 border-{borderColor} bg-{bgColor} bg-opacity-10">
		<div class="card-body">
			<h2 class="card-title justify-center">{date.format('dddd')}</h2>
		</div>
	</div>
</div>

<style>
	@keyframes jump {
		0% {
			transform: translate3d(0, 10%, 0) scale3d(1, 1, 1);
		}
		50% {
			transform: translate3d(0, 5%, 0) scale3d(1, 1, 1);
		}
		100% {
			transform: translate3d(0, 0%, 0) scale3d(1, 1, 1);
		}
	}
	.jump {
		transform-origin: 50% 50%;
		animation: jump 0.5s linear alternate infinite;
	}
</style>
