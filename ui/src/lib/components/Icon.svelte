<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte';
	import {
	faCheck,
	faCross,
		faDumbbell,
		faGear,
		faHeart,
		faInfoCircle,
		faPlus,
		faTrash,
		faUtensils,
		faWarning,
		type IconDefinition
	} from '@fortawesome/free-solid-svg-icons';

	export let icon: Icon;
	export let size: 'sm' | 'md' | 'lg' | '2x' | '3x' = 'md';

	type Icon = 'dumbbell' | 'error' | 'gear' | 'heart' | 'info' | 'plus' | 'success' | 'trash' | 'utensils' | 'warning';

	const icons: { [key: string]: IconDefinition } = {
		dumbbell: faDumbbell,
		error: faCross,
		gear: faGear,
		heart: faHeart,
		info: faInfoCircle,
		plus: faPlus,
		success: faCheck,
		trash: faTrash,
		utensils: faUtensils,
		waning: faWarning,
	};
</script>

<Fa icon={icons[icon]} size={size} />
