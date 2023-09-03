<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte';
	import {
	faCheck,
	faCross,
		faDumbbell,
		faHeart,
		faInfoCircle,
		faPlus,
		faSquareCheck,
		faWarning,
		type IconDefinition
	} from '@fortawesome/free-solid-svg-icons';

	export let icon: Icon;

	type Icon = 'dumbbell' | 'error' | 'heart' | 'info' | 'plus' | 'success' | 'warning';

	const icons: { [key: string]: IconDefinition } = {
		dumbbell: faDumbbell,
		error: faCross,
		heart: faHeart,
		info: faInfoCircle,
		plus: faPlus,
		success: faCheck,
		waning: faWarning,
	};
</script>

<Fa icon={icons[icon]} />
