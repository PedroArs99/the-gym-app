<script lang="ts">
	import { enhance } from '$app/forms';
	import Alert from '$lib/components/Alert.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import type { Routine } from '$lib/models/routine.model.js';
	import axios from 'axios';
	import { fade } from 'svelte/transition';

	export let data;
	export let form;

	let isNewModalVisible = false;

	async function deleteRoutine(id: string) {
		await axios.delete(`/excercises/${id}`);

		data.routines = data.routines.filter((r: Routine) => r.id !== id);
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
			<th />
		</tr>
	</thead>
	<tbody>
		{#each data.routines as { id, name }}
			<tr transition:fade>
				<th>{name}</th>
				<td class="float-right">
					<button class="btn btn-warning" on:click={() => deleteRoutine(id)}> Delete </button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<button on:click={() => (isNewModalVisible = true)} class="btn sticky bottom-0">
	<Icon icon="plus" />
</button>

<Dialog dialogId="new-excercise-dialog" isDialogOpen={isNewModalVisible} on:close={() => (isNewModalVisible = false)}>
	<form method="post" action="?/create" use:enhance>
		<h3 class="font-bold text-lg mb-3">Add new Routine</h3>

		{#if form?.error}
			<Alert severity="error" message={form.error} />
		{/if}

		<input type="text" name="name" placeholder="Name" required class="input input-bordered w-full" />

		<button class="btn btn-primary w-full">Save</button>
	</form>
</Dialog>
