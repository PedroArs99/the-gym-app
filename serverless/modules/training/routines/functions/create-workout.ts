import RoutinesRepository from "routines/database/routines.repository";
import { HttpRequest } from "common/http-request.model";

module.exports.handler = async (event: HttpRequest) => {
  const routineId = event.pathParameters.id;
  const workout = JSON.parse(event.body);

  console.debug(`Incoming Event: ${JSON.stringify(event, null, 2)}`);

  try {
    const result = await RoutinesRepository.createWorkout(routineId, workout);

    return {
      body: JSON.stringify(result),
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: error,
    };
  }
};
