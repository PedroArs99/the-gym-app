<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Alert from '$lib/components/Alert.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import type { Routine } from '$lib/models/routine.model.js';
	import axios from 'axios';
	import { fade } from 'svelte/transition';

	type PageData = {
		routines: Routine[];
	}

	export let data: PageData;
	export let form;

	let isNewModalVisible = false;

	function onDeleteRoutine(id: string, event: Event) {
		event.stopPropagation();
		
		data.routines = data.routines.filter(r => r.id !== id);

		axios.delete(`/routines/${id}`)
	}

	async function onDuplicateClick(id: string, event: Event) {
		event.stopPropagation();

		const originalRoutine = data.routines.find(r => r.id === id);
		const duplicated = {
			name: `${originalRoutine?.name} - Copy`,
			workouts: originalRoutine?.workouts
		}

		const response = await axios.put('/routines', duplicated);

		data.routines = [...data.routines, response.data]
	}

	function openRoutineDetails(id: string) {
		goto(`/routines/${id}`)
	}
</script>

<svelte:head>
	<title>Routines</title>
	<meta name="description" content="The list of registered routines" />
</svelte:head>

<h1 class="page-title">Routines</h1>

<table class="table table-pin-rows">
	<thead>
		<tr>
			<th>Name</th>
			<th>Created at</th>
			<th />
		</tr>
	</thead>
	<tbody>
		{#each data.routines as { id, name, createdAt }}
			<tr transition:fade class="hover" on:click={() => openRoutineDetails(id)}>
				<td>{name}</td>
				<td>{createdAt}</td>
				<td class="float-right">
					<button class="btn btn-ghost" on:click={(e) => onDuplicateClick(id, e)}>
						<Icon icon="copy" size="lg" />
					</button>
					<button class="btn btn-ghost" on:click={(e) => onDeleteRoutine(id, e)}>
						<Icon icon="trash" size="lg" />
					</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<button on:click={() => (isNewModalVisible = true)} class="btn sticky bottom-0">
	<Icon icon="plus" />
</button>

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

<style lang="postcss">
	.hover {
		cursor: pointer;
	}
</style>