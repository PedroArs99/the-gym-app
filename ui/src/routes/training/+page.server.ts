import axios from 'axios';
import { env } from '$env/dynamic/private';

export async function load() {
	const routine = await axios.get(`${env.API_URL}/routines/latest`);

	return {
		routine: routine.data,
		trainings: [
			{
				date: new Date(2023, 9, 30),
				routineId: '__r.id',
				workoutId: '__w.id'
			},
			{
				date: new Date(2023, 10, 2),
				routineId: '__r.id',
				workoutId: '__w.id'
			},
			{
				date: new Date(2023, 10, 3),
				routineId: '__r.id',
				workoutId: '__w.id'
			},
			{
				date: new Date(2023, 10, 4),
				routineId: '__r.id',
				workoutId: '__w.id'
			},
		]
	};
}
