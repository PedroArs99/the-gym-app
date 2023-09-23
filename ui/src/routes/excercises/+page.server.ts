import { fail } from '@sveltejs/kit';
import axios from 'axios';
import { env } from '$env/dynamic/private';

export async function load() {
	const response = await axios.get(`${env.API_URL}/excercises`);
	const excercises = response.data;

	return {
		excercises
	};
}

export const actions = {
	create: async ({ request }) => {
		const data: FormData = await request.formData();

		const requestBody = {
			name: data.get('name'),
			muscle: data.get('muscle')
		};

		if (requestBody.name && requestBody.muscle) {
			const response = await axios.put(`${env.API_URL}/excercises`, requestBody);

			return response.data;
		} else {
			return fail(400, {
				error: 'One of the required fields is undefined'
			});
		}
	}
};
