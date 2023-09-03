<script lang="ts">
	import Icon from "./Icon.svelte";

  export let message:string; 
  export let severity: 'error' | 'info' | 'success' | 'warning';

  $: severityClass = `alert alert-${severity}`
</script>



<div class={severityClass}>
  <Icon icon={severity} />
  <span>{ message }</span>
</div>