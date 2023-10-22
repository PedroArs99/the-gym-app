import { Schema, model } from "mongoose";
import { Routine, Workout } from "routines/routine.model";
import { v4 as uuidv4 } from "uuid";

export interface RoutineEntity {
  createdAt: Date;
  _id: string;
  name: string;
  workouts: WorkoutEntity[];
}

export interface WorkoutEntity {
  _id: string,
  number: number;
  excercises: WorkoutExcerciseEntity[];
}

export interface WorkoutExcerciseEntity {
  excercise: string;
  series: number;
  reps: number;
}

const routinesSchema = new Schema<RoutineEntity>({
  createdAt: { type: Date, required: true },
  _id: { type: String, required: true },
  name: { type: String, required: true },
  workouts: [
    {
      _id: { type: String, required: true},
      number: { type: Number, required: true },
      excercises: [
        {
          excercise: { type: String, required: true, ref: "Excercise" },
          series: { type: Number, required: true },
          reps: { type: Number, required: true },
        },
      ],
    },
  ],
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

export function workoutToEntity(model: Workout): WorkoutEntity {
  return {
    _id: model.id ?? uuidv4(),
    number: model.number,
    excercises: model.excercises.map((excercise) => ({
      excercise: excercise.excercise.id!,
      series: excercise.series,
      reps: excercise.reps,
    })),
  };
}
