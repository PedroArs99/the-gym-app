<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>Excercises</title>
	<meta name="description" content="The list of registered excercises" />
</svelte:head>

<table class="table table-pin-rows table-pin-cols">
	<thead>
		<tr>
			<th>Name</th>
			<th>Muscle group</th>
			<th />
		</tr>
	</thead>
	<tbody>
		{#each data.excercises as { name, muscle }}
			<tr>
				<th>{ name }</th>
				<td>{ muscle }</td>
				<td />
			</tr>
		{/each}
	</tbody>
</table>
