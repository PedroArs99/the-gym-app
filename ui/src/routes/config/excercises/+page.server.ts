import axios from 'axios';
import { env } from '$env/dynamic/private';

export async function load() {
	const response = await axios.get(`${env.API_URL}/excercises`);
	const excercises = response.data;

	return {
		excercises
	};
}
