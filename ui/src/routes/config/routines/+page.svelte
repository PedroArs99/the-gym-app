<script lang="ts">
	import { goto } from '$app/navigation';
	import Dialog from '$lib/components/Dialog.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import type { Routine } from '$lib/models/routine.model.js';
	import { toShortDate } from '$lib/pipes/toShortDate';
	import axios from 'axios';

	type PageData = {
		routines: Routine[];
	};

	type FormData = {
		name: string;
	}

	export let data: PageData;
	
	let isNewModalVisible = false;
	let form: FormData = {
		name: ''
	};

	async function createRoutine() {
		const routineBody = {
			name: form.name
		}

		const response = await axios.post('/api/routines', routineBody);

		isNewModalVisible = false;
		data.routines = [response.data, ...data.routines];
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
					<p><strong>Created At:</strong> {toShortDate(routine.createdAt)}</p>
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
		<h3 class="font-bold text-lg mb-3">Add new Routine</h3>

		<input type="text" name="name" bind:value={form.name} placeholder="Name" required class="input input-bordered w-full" />

		<button class="btn btn-primary w-full" on:click={createRoutine}>Save</button>
	</Dialog>
</div>

<style lang="scss">
	.card {
		@apply border border-primary lg:w-96;
	}
	.routines-container {
		@apply flex flex-col lg:flex-row gap-3;
	}
</style>
