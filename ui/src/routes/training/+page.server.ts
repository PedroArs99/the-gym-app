import axios from 'axios';
import { env } from '$env/dynamic/private';

export async function load() {
	const routine = await axios.get(`${env.API_URL}/routines/latest`);

	return {
		routine: routine.data,
	};
}
