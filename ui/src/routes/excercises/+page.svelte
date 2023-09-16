<script lang="ts">
	import { enhance } from '$app/forms';
	import Alert from '$lib/components/Alert.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import type { Excercise } from '$lib/models/excercise.model.js';
	import { Muscles } from '$lib/models/muscles.enum';
	import axios from 'axios';
	import { fade } from 'svelte/transition';

	export let data;
	export let form;

	let isNewModalVisible = false;

	$: if (form && !form.error) isNewModalVisible = false;

	async function deleteExcercise(id: string) {
		await axios.delete(`/excercises/${id}`);

		data.excercises = data.excercises.filter((e: Excercise) => e.id !== id);
	}
</script>

<svelte:head>
	<title>Excercises</title>
	<meta name="description" content="The list of registered excercises" />
</svelte:head>

<h1 class="page-title">Excercises</h1>

<table class="table table-pin-rows">
	<thead>
		<tr>
			<th>Name</th>
			<th>Muscle group</th>
			<th />
		</tr>
	</thead>
	<tbody>
		{#each data.excercises as { id, name, muscle }}
			<tr transition:fade>
				<th>{name}</th>
				<td>{muscle}</td>
				<td class="float-right">
					<button class="btn btn-warning" on:click={() => deleteExcercise(id)}> Delete </button>
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
		<h3 class="font-bold text-lg mb-3">Add new Excercise</h3>

		{#if form?.error}
			<Alert severity="error" message={form.error} />
		{/if}

		<input type="text" name="name" placeholder="Name" required class="input input-bordered w-full" />

		<select name="muscle" required class="select select-bordered">
			<option value={undefined} selected disabled>Muscle</option>
			{#each Object.values(Muscles) as muscle}
				<option value={muscle}>{muscle}</option>
			{/each}
		</select>

		<button class="btn btn-primary w-full">Save</button>
	</form>
</Dialog>
