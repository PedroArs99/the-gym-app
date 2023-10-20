import axios from 'axios';
import { env } from '$env/dynamic/private';

export async function POST({ params, request }) {
	const body = await request.json();

	const response = await axios.post(`${env.API_URL}/routines/${params.id}/workouts`, body);

	return new Response(response.data, { status: 201 });
}
