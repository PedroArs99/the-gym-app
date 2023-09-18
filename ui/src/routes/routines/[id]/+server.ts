import axios from 'axios';
import { API_URL } from '$env/static/private';


export async function PUT({ request }) {
	const body = await request.json();

	const response = await axios.put(`${API_URL}/routines`, body);

	return new Response(response.data, { status: response.status, statusText: response.statusText });
}
