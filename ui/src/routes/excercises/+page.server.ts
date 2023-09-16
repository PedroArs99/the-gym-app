import { fail } from '@sveltejs/kit';
import axios from 'axios';
import { API_URL } from '$env/static/private';

export async function load() {
	const response = await axios.get(`${API_URL}/excercises`);
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
			const response = await axios.put(`${API_URL}/excercises`, requestBody);

			return response.data;
		} else {
			return fail(400, {
				error: 'One of the required fields is undefined'
			});
		}
	}
};
