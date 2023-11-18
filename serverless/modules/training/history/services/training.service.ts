import ExcerciseRepository from "excercises/database/excercise.repository";
import { TrainingRepository } from "../database/training.repository";
import { Training } from "../training.model";

export async function registerTraining(training: Training) {
  const registeredTraining = await TrainingRepository.registerTraining(training);

  const excerciseLoads = Object.entries(training.excercisesLoad);

  for (let index = 0; index < excerciseLoads.length; index++) {
    const [excerciseId, weight] = excerciseLoads[index];
    
    await ExcerciseRepository.registerExcerciseLoad(excerciseId, weight)
  }

  return registeredTraining;
}

export const TrainingService = {
  registerTraining,
};
