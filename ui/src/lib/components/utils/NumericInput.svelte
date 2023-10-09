<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: number;

	let dispatch = createEventDispatcher();

	$: value, dispatch('valueChanged', value);
</script>

<div class="join mb-3">
	<button class="btn btn-primary join-item" on:click={() => value--}>-</button>
	<input class="join-item numeric-input" type="number" bind:value />
	<button class="btn btn-primary join-item" on:click={() => value++}>+</button>
</div>

<style lang="scss">
	.numeric-input {
		@apply input input-bordered w-full text-center focus:outline-none;
	}
</style>
