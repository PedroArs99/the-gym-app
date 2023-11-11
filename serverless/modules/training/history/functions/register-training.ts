import { HttpRequest } from "common/http-request.model";
import { TrainingService } from "../services/training.service";

module.exports.handler = async (event: HttpRequest) => {
  const training = JSON.parse(event.body);

  console.debug(`Incoming Event: ${JSON.stringify(event, null, 2)}`);

  try {
    const result = await TrainingService.registerTraining(training);

    return {
      body: JSON.stringify(result, null, 2),
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 201,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: error,
    };
  }
};
