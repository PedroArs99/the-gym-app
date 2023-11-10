import type { Training } from '$lib/models/training.model';
import { now } from '$lib/utils/date-utils';

function getActiveTraining(): Training | undefined {
	const currentTraining = localStorage.getItem('training.current');

	if (currentTraining) {
		return JSON.parse(currentTraining);
	} else {
		return undefined;
	}
}

function finishTraining() {
	localStorage.removeItem('training.current');
};

function startTraining(routineId: string, workoutId: string) {
	const currentTraining = localStorage.getItem('training.current');

	if (currentTraining) {
		throw Error('Error: A training is already active!');
	} else {
		const storageEntry = {
			routineId,
			workoutId,
			date: now()
		};

		localStorage.setItem('training.current', JSON.stringify(storageEntry));
	}
}

export const TrainingService = {
	getActiveTraining,
	finishTraining,
	startTraining
};
