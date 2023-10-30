import mongoose, { model } from "mongoose";
import { Routine, Workout } from "routines/routine.model";
import { v4 as uuidv4 } from "uuid";
import {
  RoutineModel,
  toModel,
  toModelWithWorkouts,
  workoutToEntity,
  workoutToModel,
} from "./routine.entity";

import {
  ExcerciseEntity,
  excerciseSchema,
} from "excercises/database/excercise.entity";

const mongoConnStr = process.env.MONGO_CONNECTION_STRING;

async function createRoutine(name: string): Promise<Routine> {
  await mongoose.connect(mongoConnStr!);

  const routine = new RoutineModel({
    createdAt: new Date(),
    _id: uuidv4(),
    name,
  });

  await routine.save();

  mongoose.disconnect();

  return toModel(routine);
}

async function createWorkout(routineId: string, newWorkout: Workout) {
  await mongoose.connect(mongoConnStr!);

  const newWorkoutEntity = workoutToEntity(newWorkout);
  await RoutineModel.updateOne(
    { _id: routineId },
    {
      $push: {
        workouts: newWorkoutEntity,
      },
    }
  );
  mongoose.disconnect();

  return workoutToModel(newWorkoutEntity);
}

async function deleteWorkout(routineId: string, workoutId: string) {
  await mongoose.connect(mongoConnStr!);
  await RoutineModel.updateOne(
    { _id: routineId },
    {
      $pull: {
        workouts: {
          _id: workoutId,
        },
      },
    }
  );

  mongoose.disconnect();
}

async function getRoutineById(id: string) {
  await mongoose.connect(mongoConnStr!);

  model<ExcerciseEntity>("Excercise", excerciseSchema);

  const routine = await RoutineModel.findById(id)
    .populate({
      path: "workouts",
      populate: {
        path: "excercises",
        populate: {
          path: "excercise",
          model: "Excercise",
        },
      },
    });

  mongoose.disconnect();

  return routine ? toModelWithWorkouts(routine) : null;
}

async function getRoutines(): Promise<Routine[]> {
  await mongoose.connect(mongoConnStr!);

  const routines = await RoutineModel.find();

  mongoose.disconnect();

  return routines.map((r) => toModel(r));
}

const RoutinesRepository = {
  createRoutine,
  createWorkout,
  deleteWorkout,
  getRoutineById,
  getRoutines,
};

export default RoutinesRepository;
