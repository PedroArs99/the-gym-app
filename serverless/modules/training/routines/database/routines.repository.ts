import mongoose, { mongo } from "mongoose";
import { Routine } from "routines/routine.model";
import { v4 as uuidv4 } from "uuid";
import { RoutineModel, toModel } from "./routine.entity";

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

async function getRoutineById(id: string) {
  await mongoose.connect(mongoConnStr!);

  const routine = await RoutineModel.findById(id);

  mongoose.disconnect();

  return routine ? toModel(routine) : null;
}

async function getRoutines(): Promise<Routine[]> {
  await mongoose.connect(mongoConnStr!);

  const routines = await RoutineModel.find();

  mongoose.disconnect();

  return routines.map(r => toModel(r));
}

const RoutinesRepository = {
  createRoutine,
  getRoutineById,
  getRoutines,
};

export default RoutinesRepository;
