import { HttpRequest } from "common/http-request.model";
import ExcerciseRepository from "../database/excercise.repository";

module.exports.handler = async (event: HttpRequest) => {
  const excercise= JSON.parse(event.body);

  console.debug(`Incoming Event: ${JSON.stringify(event, null, 2)}`);

  try {
    const result = await ExcerciseRepository.createExcercise(excercise);

    return {
      body: JSON.stringify(result, null, 2),
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
