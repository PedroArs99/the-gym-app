import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import axios from 'axios';

export async function load() {
	const response = await axios.get(`${env.API_URL}/routines`);
	const routines = response.data;

	return {
		routines
	};
}