import axios from 'axios';
import { env } from '$env/dynamic/private';

export async function PUT({ request }) {
	const body = await request.json();

	const response = await axios.put(`${env.API_URL}/routines`, body);

	return new Response(JSON.stringify(response.data), {
		headers: {
			'content-type': 'application/json'
		},
		status: response.status, statusText: response.statusText
	});
}

export async function DELETE({ params }) {
	await axios.delete(`${env.API_URL}/routines/${params.id}`);

	return new Response(null, { status: 204 });
}
