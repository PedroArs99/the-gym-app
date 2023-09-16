<script>
	import Icon from '$lib/components/Icon.svelte';
	import { page } from '$app/stores';
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
	</div>
	<div class="navbar-center">
		<a href="/" class="btn btn-ghost normal-case text-xl" class:active={$page.route.id === '/routines'}>
        <Icon icon='heart' />
        <Icon icon='dumbbell' />
		</a>
	</div>
	<div class="navbar-end">
			<a href="/excercises" class="btn btn-ghost normal-case text-xl" class:active={$page.route.id === '/excercises'}>
				<Icon icon='gear' />
			</a>
	</div>
</div>

<style lang="postcss">
	.active {
		@apply border-b-primary;
	}
</style>