import { MongoClient } from "mongodb";

import { Excercise } from "../excercise.model";
import { ExcerciseEntity, toModel } from "./excercise.entity";

const MONGO_CLUSTER_NAME = process.env.MONGO_CLUSTER_NAME;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const mongoConnStr = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER_NAME}/${MONGO_DB_NAME}?retryWrites=true`;

const client = new MongoClient(mongoConnStr);

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
  getExcercises,
};

export default ExcerciseRepository;
