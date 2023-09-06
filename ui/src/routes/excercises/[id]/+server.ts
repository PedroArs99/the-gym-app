import axios from 'axios';

const apiUrl = 'https://5rjvidrtda.execute-api.eu-central-1.amazonaws.com';

export async function DELETE({ params }) {
	await axios.delete(`${apiUrl}/excercises/${params.id}`);

	return new Response(null, { status: 204 });
}
