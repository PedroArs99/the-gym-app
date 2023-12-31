import RoutinesRepository from "../database/routines.repository";
import { HttpRequest } from "../../../../common/http-request.model";

module.exports.handler = async (event: HttpRequest) => {
  const { name } = JSON.parse(event.body);

  console.debug(`Incoming Event: ${JSON.stringify(event, null, 2)}`);

  try {
    const routine = await RoutinesRepository.createRoutine(name);

    return {
      body: JSON.stringify(routine, null, 2),
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
