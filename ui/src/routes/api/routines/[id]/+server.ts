import axios from 'axios';
import { env } from '$env/dynamic/private';

export async function DELETE({ params }) {
	await axios.delete(`${env.API_URL}/routines/${params.id}`);

	return new Response(null, { status: 204 });
}
