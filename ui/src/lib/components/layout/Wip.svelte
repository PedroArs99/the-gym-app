<script>
	import Icon from "../Icon.svelte";

</script>
<section>
  <h1>WIP</h1>
  <div class="icon">
    <Icon icon="gear" size="6x" spin />
  </div>
</section>

<style>
  h1 {
    @apply text-6xl text-center;
  }

  .icon {
    margin-left: auto;
    margin-right: auto;
  }

  section {
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    

    @apply gap-3;
  }
</style>