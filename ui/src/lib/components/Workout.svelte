<script lang="ts">
	import type { Workout } from "$lib/models/routine.model";

  export let workout: Workout;
</script>

<div class="card">
  <div class="card-body">
    <div class="card-title">Workout #{workout.number}</div>
  </div>
</div>

<style lang="postcss">
  .card {
    @apply border;
  }
</style>