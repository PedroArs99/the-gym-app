import { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { Training } from "../training.model";

export interface TrainingEntity {
  _id: string;
  date: Date;
  routineId: string;
  workoutId: string;
}

export const trainingSchema = new Schema<TrainingEntity>({
  _id: { type: String, required: true },
  date: { type: Date, required: true },
  routineId: { type: String, required: true },
  workoutId: { type: String, required: true},
});


export function toModel(entity: TrainingEntity): Training {
  return {
    id: entity._id,
    date: entity.date,
    routineId: entity.routineId,
    workoutId: entity.workoutId,
  };
}
export function toEntity(model: Training): TrainingEntity {
  return {
    _id: model.id ?? uuidv4(),
    date: model.date,
    routineId: model.routineId,
    workoutId: model.workoutId,
  };
}
