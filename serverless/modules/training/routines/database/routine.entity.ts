import { Schema, model } from "mongoose";
import { Routine } from "routines/routine.model";

export interface RoutineEntity {
  createdAt: Date;
  _id: string;
  name: string;
}

const routinesSchema = new Schema<RoutineEntity>({
  createdAt: { type: Date, required: true },
  _id: { type: String, required: true },
  name: { type: String, required: true },
});

export const RoutineModel = model<RoutineEntity>("Routine", routinesSchema);

export function toModel(entity: RoutineEntity): Routine {
  return {
    createdAt: entity.createdAt,
    id: entity._id,
    name: entity.name,
    workouts: [],
  };
}
