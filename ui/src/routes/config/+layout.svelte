<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="config">
	<slot />

  <div class="tabs-wrapper">
    <div class="tabs tabs-boxed">
      <a href="/config/routines" class="tab" class:tab-active={$page.route.id?.startsWith('/config/routines')}>Routines</a>
      <a href="/config/excercises" class="tab" class:tab-active={$page.route.id === '/config/excercises'}>Excercises</a>
    </div>
  </div>
</div>

<style>
  .config {
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

	.tabs {
		justify-content: space-evenly;
  }

  .tabs-wrapper {
    width: 100%;

    padding-bottom: 76px;
    padding-top: 12px;

    border-top: 1px solid hsl(var(--b3));

    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 50;

    background-color: hsl(var(--pc));
  }
</style>
