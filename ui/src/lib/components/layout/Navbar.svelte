<script>
	import Icon from '$lib/components/Icon.svelte';
	import { page } from '$app/stores';
</script>

<div class="btm-nav z-50 drop-shadow-2xl">
	<a href="/" class="text-primary flex flex-row" class:active={$page.route.id?.startsWith('/routines')}>
		<Icon icon="heart" />
		<Icon icon="dumbbell" />
	</a>
	<a href="/excercises" class="text-primary" class:active={$page.route.id?.startsWith('/excercises')}>
		<Icon icon="gear" />
	</a>
</div>

<style lang="postcss">
	.btm-nav a:hover {
		@apply bg-base-200;
	}
</style>
