<script>
	import Icon from '../Icon.svelte';
</script>

<section>
	<div class="icon">
		<Icon icon="dumbbell" size="4x" spin />
	</div>
</section>

<style>
	.icon {
		margin-left: auto;
		margin-right: auto;
	}

	section {
		flex-grow: 1;

		display: flex;
		flex-direction: column;
		justify-content: center;

		@apply gap-3;
	}
</style>
