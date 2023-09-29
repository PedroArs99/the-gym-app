import type { Excercise } from '$lib/models/excercise.model';
import { writable, type Writable } from 'svelte/store';

type ExcerciseStore = Writable<Excercise[]> & {
	addNewExcercise: (excercise: Excercise) => void;
};

const _excerciseStore = (): ExcerciseStore => {
	const { subscribe, set, update } = writable(new Array<Excercise>());

	return {
		subscribe,
		set,
		update,
		addNewExcercise: (excercise: Excercise) => {
			update((oldValue) => [...oldValue, excercise]);
		}
	};
};

export const excercisesStore: ExcerciseStore = _excerciseStore();
