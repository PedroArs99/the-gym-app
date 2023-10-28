import RoutinesRepository from "routines/database/routines.repository";
import { HttpRequest } from "common/http-request.model";

module.exports.handler = async (event: HttpRequest) => {
  const routineId = event.pathParameters.routineId;
  const workoutId = event.pathParameters.workoutId;

  console.debug(`Incoming Event: ${JSON.stringify(event, null, 2)}`);

  try {
    await RoutinesRepository.deleteWorkout(routineId, workoutId);

    return {
      statusCode: 204,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: error,
    };
  }
};
