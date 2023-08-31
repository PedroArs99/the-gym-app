<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faDumbbell, faHeart, type IconDefinition } from '@fortawesome/free-solid-svg-icons';

	export let icon: Icon;

	type Icon = 'dumbbell' | 'heart';

	const icons: { [key: string]: IconDefinition } = {
		dumbbell: faDumbbell,
		heart: faHeart
	};
</script>

<Fa icon={icons[icon]} />
