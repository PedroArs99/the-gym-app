export function buildJsonResponse(data: string, statusCode: number): Response {
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json'
		},
		status: statusCode
	});
}
