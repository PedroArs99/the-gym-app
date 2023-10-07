import { env } from '$env/dynamic/private';
import axios from 'axios';

export async function load({ params }) {
	const [routineResponse, excercisesResponse] = await Promise.all([
		axios.get(`${env.API_URL}/routines/${params.id}`),
		axios.get(`${env.API_URL}/excercises`)
	]);

	return {
		excercises: excercisesResponse.data,
		routine: routineResponse.data
	};
}
