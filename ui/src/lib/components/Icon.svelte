<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		faArrowLeft,
		faCheck,
		faCopy,
		faCross,
		faDumbbell,
		faEllipsisVertical,
		faGear,
		faHeart,
		faInfoCircle,
		faPencil,
		faPlus,
		faTrash,
		faUtensils,
		faWarning,
		type IconDefinition
	} from '@fortawesome/free-solid-svg-icons';

	export let icon: Icon;
	export let size: 'sm' | 'md' | 'lg' | '2x' | '3x' | '4x'| '6x' = 'md';
	export let spin: boolean = false;

	type Icon =
		| 'arrow-left'
		| 'copy'
		| 'dumbbell'
		| 'ellipsis-vertical'
		| 'error'
		| 'gear'
		| 'heart'
		| 'info'
		| 'pencil'
		| 'plus'
		| 'success'
		| 'trash'
		| 'utensils'
		| 'warning';

	const icons: { [key: string]: IconDefinition } = {
		'arrow-left': faArrowLeft,
		copy: faCopy,
		dumbbell: faDumbbell,
		'ellipsis-vertical': faEllipsisVertical,
		error: faCross,
		gear: faGear,
		heart: faHeart,
		info: faInfoCircle,
		pencil: faPencil,
		plus: faPlus,
		success: faCheck,
		trash: faTrash,
		utensils: faUtensils,
		waning: faWarning
	};
</script>

<Fa icon={icons[icon]} {size} {spin} />
