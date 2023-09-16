import axios from 'axios';
import { API_URL } from '$env/static/private';

export async function DELETE({ params }) {
	await axios.delete(`${API_URL}/excercises/${params.id}`);

	return new Response(null, { status: 204 });
}
