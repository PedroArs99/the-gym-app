import { env } from '$env/dynamic/private';
import { buildJsonResponse } from '$lib/utils/response-utils.js';
import axios from 'axios';

export async function POST({ request }) {
	const body = await request.json();

	const response = await axios.post(`${env.API_URL}/training`, body);

  return buildJsonResponse(response.data, response.status);
}
