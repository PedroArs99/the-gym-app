import { TrainingRepository } from "../database/training.repository";
import { Training } from "../training.model";

export function registerTraining(training: Training) {
  return TrainingRepository.registerTraining(training);
}

export const TrainingService = {
  registerTraining,
}