import { env } from "$env/dynamic/private";
import axios from "axios";

export async function PUT({ request }) {
  const body = await request.json();

	const response = await axios.put(`${env.API_URL}/excercises`, body);

	return new Response(response.data, { status: response.status, statusText: response.statusText });
}
