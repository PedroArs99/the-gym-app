<script>
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import './styles.css';
</script>

<div class="app">
	<Navbar />

	<main>
		<slot />
	</main>
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
