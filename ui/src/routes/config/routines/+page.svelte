<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Alert from '$lib/components/Alert.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import type { Routine } from '$lib/models/routine.model.js';
	import axios from 'axios';

	type PageData = {
		routines: Routine[];
	};

	export let data: PageData;
	export let form;

	let isNewModalVisible = false;

	function onDeleteRoutine(id: string, event: Event) {
		event.stopPropagation();

		data.routines = data.routines.filter((r) => r.id !== id);

		axios.delete(`/routines/${id}`);
	}

	async function onDuplicateClick(id: string, event: Event) {
		// TODO Move to the backend
		event.stopPropagation();

		const originalRoutine = data.routines.find((r) => r.id === id);
		const duplicated = {
			name: `${originalRoutine?.name} - Copy`,
			workouts: originalRoutine?.workouts
		};

		const response = await axios.put('/routines', duplicated);

		data.routines = [...data.routines, response.data];
	}
</script>

<svelte:head>
	<title>Routines</title>
	<meta name="description" content="The list of registered routines" />
</svelte:head>

<div class="page">
	<h1 class="page-title">Routines</h1>

	<div class="routines-container">
		{#each data.routines as routine}
			<div class="card hover:bg-base-300 hover:cursor-pointer" on:click={() => goto(`./routines/${routine.id}`)}>
				<div class="card-body">
					<h2 class="card-title">{routine.name}</h2>
					<p><strong>Created At:</strong> {routine.createdAt}</p>
					<div class="card-actions">
						<button class="btn btn-primary" on:click={(e) => onDuplicateClick(routine.id, e)}>
							<Icon icon="copy" size="lg" />
							<span>Duplicate</span>
						</button>
						<button class="btn btn-primary" on:click={(e) => onDeleteRoutine(routine.id, e)}>
							<Icon icon="trash" size="lg" />
							<span>Delete</span>
						</button>
					</div>
				</div>
			</div>
		{/each}

		<div class="card">
			<button class="btn w-full h-full p-3" on:click={() => (isNewModalVisible = true)}>
				<Icon icon="plus" size="2x" />
			</button>
		</div>
	</div>

	<Dialog dialogId="new-routine-dialog" isDialogOpen={isNewModalVisible} on:close={() => (isNewModalVisible = false)}>
		<form method="post" action="?/create" use:enhance>
			<h3 class="font-bold text-lg mb-3">Add new Routine</h3>

			{#if form?.error}
				<Alert severity="error" message={form.error} />
			{/if}

			<input type="text" name="name" placeholder="Name" required class="input input-bordered w-full" />

			<button class="btn btn-primary w-full">Save</button>
		</form>
	</Dialog>
</div>

<style lang="scss">
	.card {
		@apply border border-primary lg:w-96;
	}

	.card-actions {
		justify-content: space-around;
	}

	.routines-container {
		@apply flex flex-col lg:flex-row gap-3;
	}
</style>
