import { env } from '$env/dynamic/private';
import axios from 'axios';

export async function load() {
	const activeRoutine = await axios.get(`${env.API_URL}/routines/active`);

	return {
		activeRoutine: activeRoutine.data
	};
}
