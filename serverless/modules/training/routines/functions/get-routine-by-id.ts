import RoutinesRepository from "../routines.repository";
import { HttpRequest } from "../../../../common/http-request.model";

module.exports.handler = async (event: HttpRequest) => {
  try {
    const routineId =
      event.pathParameters?.["id"] || "e54e9248-a4cf-49a2-82ff-10c494b012ff";

    const routine = await RoutinesRepository.getRoutineById(routineId);

    if (routine) {
      return {
        statusCode: 200,
        body: JSON.stringify(routine),
      };
    } else {
      return {
        statusCode: 404,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: error,
    };
  }
};
