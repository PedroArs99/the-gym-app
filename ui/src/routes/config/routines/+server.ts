import { env } from '$env/dynamic/private';
import axios from 'axios';

export async function POST({ request }) {
	const body = await request.json();

	const response = await axios.put(`${env.API_URL}/routines`, body);

	return new Response(JSON.stringify(response.data), {
		headers: {
			'content-type': 'application/json'
		},
		status: response.status,
		statusText: response.statusText
	});
}
