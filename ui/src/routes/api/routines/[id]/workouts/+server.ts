import axios from 'axios';
import { env } from '$env/dynamic/private';
import { buildJsonResponse } from '$lib/utils/response-utils.js';

export async function POST({ params, request }) {
	const body = await request.json();

	const response = await axios.post(`${env.API_URL}/routines/${params.id}/workouts`, body);

	return buildJsonResponse(response.data, 201);
}
