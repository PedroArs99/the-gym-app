<script>
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import './styles.css';
	import { navigating } from '$app/stores';
	import Spinner from '$lib/components/utils/Spinner.svelte';
</script>

<div class="app">
	<main>
		{#if $navigating}
			<Spinner />
		{:else}
			<slot />
		{/if}
	</main>

	<Navbar />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		margin-bottom: 64px;
		box-sizing: border-box;
	}
</style>
