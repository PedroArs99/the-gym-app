import RoutinesRepository from "routines/database/routines.repository";

module.exports.handler = async () => {
  try {
    const routine = await RoutinesRepository.getLatestRoutine();

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
