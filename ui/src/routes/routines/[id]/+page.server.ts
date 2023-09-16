import { API_URL } from '$env/static/private';
import axios from 'axios';

export async function load({ params }) {
	const response = await axios.get(`${API_URL}/routines/${params.id}`);
	const routine = response.data;

	return {
		routine
	};
}