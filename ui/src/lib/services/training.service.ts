import type { Training } from '$lib/models/training.model';
import { now } from '$lib/utils/date-utils';
import axios from 'axios';

async function finishTraining() {
	const currentTraining = localStorage.getItem('training.current');

	if (currentTraining) {
		const parsedCurrentTraining = JSON.parse(currentTraining) as Training;

		await axios.post('/api/training', {
			routineId: parsedCurrentTraining.routineId,
			workoutId: parsedCurrentTraining.workoutId,
			excercisesLoad: parsedCurrentTraining.excercisesLoad,
		});

		localStorage.removeItem('training.current');
	} else {
		throw new Error('Errot: There is no active current training!');
	}
}

function getActiveTraining(): Training | undefined {
	const currentTraining = localStorage.getItem('training.current');

	if (currentTraining) {
		return JSON.parse(currentTraining);
	} else {
		return undefined;
	}
}

function registerExcerciseLoad(excerciseId: string, weight: number) {
	const currentTraining = getActiveTraining();

	if (!currentTraining) throw new Error('ERROR: No current training active');

	currentTraining.excercisesLoad[excerciseId] = weight;

	saveTrainingOnStorage(currentTraining);
}

function saveTrainingOnStorage(training: Training) {
	localStorage.setItem('training.current', JSON.stringify(training));
}

function startTraining(routineId: string, workoutId: string) {
	const currentTraining = localStorage.getItem('training.current');

	if (currentTraining) {
		throw Error('Error: A training is already active!');
	} else {
		const storageEntry: Training = {
			routineId,
			workoutId,
			date: now().toDate(),
			excercisesLoad: {}
		};

		saveTrainingOnStorage(storageEntry);
	}
}

export const TrainingService = {
	finishTraining,
	getActiveTraining,
	registerExcerciseLoad,
	startTraining
};
