<script lang="ts">
  export let data;
</script>

<svelte:head>
	<title>{data.routine.name}</title>
	<meta name="description" content="The details of the selected routine" />
</svelte:head>

<h1 class="page-title">{data.routine.name}</h1>