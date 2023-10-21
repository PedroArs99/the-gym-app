import { MongoClient } from "mongodb";

import { Excercise } from "../excercise.model";
import { ExcerciseEntity, toEntity, toModel } from "./excercise.entity";

const mongoConnStr = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(mongoConnStr!);

async function createExcercise(model: Excercise) {
  await client.connect();
  const db = client.db();

  const entity = toEntity(model);

  await db.collection<ExcerciseEntity>("excercises").insertOne(entity);

  client.close();

  return toModel(entity);
}

async function getExcercises(): Promise<Excercise[]> {
  await client.connect();
  const db = client.db();

  const excercises: ExcerciseEntity[] = (await db
    .collection("excercises")
    .find()
    .toArray()) as unknown as ExcerciseEntity[];
  
  client.close()

  return excercises.map((e) => toModel(e));
}

const ExcerciseRepository = {
  createExcercise,
  getExcercises,
};

export default ExcerciseRepository;
