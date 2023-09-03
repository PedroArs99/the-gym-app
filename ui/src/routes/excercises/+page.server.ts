import type { Excercise } from '$lib/models/excercise.model';
import { Muscles } from '$lib/models/muscles.enum';
import axios from 'axios';

const apiUrl = 'https://5rjvidrtda.execute-api.eu-central-1.amazonaws.com';

export async function load() {
	const response = await axios.get(`${apiUrl}/excercises`);
	const excercises = response.data;

	return {
		excercises,
	}
}

