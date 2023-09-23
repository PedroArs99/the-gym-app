import axios from 'axios';
import { env } from '$env/dynamic/private';

export async function PUT({ request }) {
	const body = await request.json();

	const response = await axios.put(`${env.API_URL}/routines`, body);

	return new Response(response.data, { status: response.status, statusText: response.statusText });
}
