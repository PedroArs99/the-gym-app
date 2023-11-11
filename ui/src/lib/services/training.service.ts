import type { Training } from '$lib/models/training.model';
import { now } from '$lib/utils/date-utils';
import axios from 'axios';

function getActiveTraining(): Training | undefined {
	const currentTraining = localStorage.getItem('training.current');

	if (currentTraining) {
		return JSON.parse(currentTraining);
	} else {
		return undefined;
	}
}

async function finishTraining() {
	const currentTraining = localStorage.getItem('training.current');

	if (currentTraining) {
		const parsedCurrentTraining = JSON.parse(currentTraining) as Training;

		await axios.post('/api/training', {
			date: new Date().toISOString(),
			routineId: parsedCurrentTraining.routineId,
			workoutId: parsedCurrentTraining.workoutId
		});

		localStorage.removeItem('training.current');
	} else {
		throw new Error("Errot: There is no active current training!")
	}
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
