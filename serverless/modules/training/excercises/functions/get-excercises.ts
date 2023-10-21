import ExcerciseRepository from "../database/excercise.repository";

module.exports.handler = async () => {
  try {
    const excercises = await ExcerciseRepository.getExcercises();

    return {
      statusCode: 200,
      body: JSON.stringify(excercises),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: error,
    };
  }
};
