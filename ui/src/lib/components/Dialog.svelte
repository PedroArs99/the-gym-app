<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let isDialogOpen: boolean;
	export let dialogId: string;

	let dialog: HTMLDialogElement;
	let dispatch = createEventDispatcher();

	$: if (isDialogOpen) dialog?.showModal(); else dialog?.close();

	onMount(() => {
		dialog = document.getElementById(dialogId) as HTMLDialogElement;
	});

	function closeDialog() {
		dispatch('close');
	}
</script>

<dialog id={dialogId} class="modal-box">
	<button on:click={closeDialog} class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
	<slot />
</dialog>
