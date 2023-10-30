import axios from 'axios';
import { env } from '$env/dynamic/private';
import { buildJsonResponse } from '$lib/utils/response-utils.js';

export async function DELETE({ params }) {
	const response = await axios.delete(`${env.API_URL}/routines/${params.id}/workouts/${params.wid}`);

	return buildJsonResponse(response.data, 200);
}
