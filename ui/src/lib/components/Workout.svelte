<script lang="ts">
	import type { Workout } from "$lib/models/routine.model";
	import Icon from "./Icon.svelte";

  export let workout: Workout;
</script>

<div class="card">
  <div class="card-body">
    <div class="card-title">Workout #{workout.number}</div>
    <div class="excercises">
      <button class="new-excercise-button">
        <Icon icon="plus" size="lg"/>
      </button>
    </div>
  </div>
</div>

<style lang="postcss">
  .card {
    @apply border border-primary rounded-2xl;
  }

  .card-title {
    @apply text-2xl;
  }

  .new-excercise-button {
    @apply border-4 border-dashed p-8;
  }

  .new-excercise-button:hover {
    @apply bg-base-200;
  }
</style>