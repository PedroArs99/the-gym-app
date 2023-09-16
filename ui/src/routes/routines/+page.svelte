<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Alert from '$lib/components/Alert.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { fade } from 'svelte/transition';

	export let data;
	export let form;

	let isNewModalVisible = false;

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
				<td class="float-right"></td>
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