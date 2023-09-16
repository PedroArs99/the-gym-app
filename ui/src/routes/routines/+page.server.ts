import { API_URL } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import axios from 'axios';

export async function load() {
	const response = await axios.get(`${API_URL}/routines`);
	const routines = response.data;

	return {
		routines
	};
}

export const actions = {
	create: async ({ request }) => {
		const data: FormData = await request.formData();

		const requestBody = {
			name: data.get('name'),
		};

		if (requestBody.name) {
			const response = await axios.put(`${API_URL}/routines`, requestBody);

			return response.data;
		} else {
			return fail(400, {
				error: 'One of the required fields is undefined'
			});
		}
	}
};
