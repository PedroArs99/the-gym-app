import { MongoClient } from "mongodb";
import { Training } from "../training.model";
import { TrainingEntity, toEntity, toModel } from "./training.entity";

const mongoConnStr = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(mongoConnStr!);

async function registerTraining(model: Training) {
  await client.connect();
  const db = client.db();

  const entity = toEntity(model);

  await db.collection<TrainingEntity>("trainings").insertOne(entity);

  client.close();

  return toModel(entity);
}

export const TrainingRepository = {
  registerTraining,
} 