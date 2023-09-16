import type { Routine } from '$lib/models/routine.model';
import { fail } from '@sveltejs/kit';

export async function load() {
	const routines: Routine[] = [];

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
			const response = {
				data: {
					id: '82da9e04-9c71-4e47-b0d6-6e97a5c0a9df',
					createdAt: new Date(),
					name: 'September 2023 - Just stay fit',
				}
			};

			
			return response.data;
		} else {
			return fail(400, {
				error: 'One of the required fields is undefined'
			});
		}
	}
};