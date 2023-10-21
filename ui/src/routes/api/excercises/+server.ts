import { env } from "$env/dynamic/private";
import axios from "axios";

export async function POST({ request }) {
	const body = await request.json();

	const response = await axios.post(`${env.API_URL}/excercises`, body);
	console.log(response);

	return new Response(response.data, { status: response.status, statusText: response.statusText });
}
