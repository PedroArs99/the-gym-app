import type { Excercise } from '$lib/models/excercise.model';
import { Muscles } from '$lib/models/muscles.enum';

export function load() {
	return {
		excercises: [
			{
				id: '2027ac88-2d18-4889-8ff6-92a753a56001',
				name: 'Squat',
				muscle: Muscles.LEGS
			}
		]
	};
}
