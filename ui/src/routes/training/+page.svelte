<script lang="ts">
	import Spinner from '$lib/components/utils/Spinner.svelte';
	import type { Routine } from '$lib/models/routine.model';

	type PageData = {
		activeRoutine: Routine
	}

	export let data: PageData;
</script>

<div class="page">
	<h1 class="page-title">
		Train Today
	</h1>
</div>

<Spinner />


