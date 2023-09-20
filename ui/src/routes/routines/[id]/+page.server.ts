import { API_URL } from '$env/static/private';
import axios from 'axios';

export async function load({ params }) {
	const [routineResponse, excercisesResponse] = await Promise.all([
		axios.get(`${API_URL}/routines/${params.id}`),
		axios.get(`${API_URL}/excercises`)
	]);

	return {
		excercises: excercisesResponse.data,
		routine: routineResponse.data,
	};
}
