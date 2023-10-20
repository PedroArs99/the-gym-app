import RoutinesRepository from "routines/routines.repository";

module.exports.handler = async () => {
  try {
    const routines = await RoutinesRepository.getRoutines();

    return {
      statusCode: 200,
      body: JSON.stringify(routines),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: error,
    };
  }
};
