<script lang="ts">
	import type { Training } from '$lib/models/training.model';
	import type { Dayjs } from 'dayjs';
	import { onMount } from 'svelte';

	export let date: Dayjs;
  export let training: Training | undefined;

  let borderColor: 'success' | 'primary' = 'primary';
  let bgColor: 'success' | 'primary-content' = 'primary-content';

  onMount(() => {
    if(training) {
      borderColor = 'success';
      bgColor = 'success';
    }
  });
</script>

<div class="training-history-entry">
  <div class="card card-compact card-bordered w-32 border-{borderColor} bg-{bgColor} bg-opacity-10">
    <div class="card-body">
      <h2 class="card-title justify-center">{date.format('dddd')}</h2>
    </div>
  </div>
</div>


