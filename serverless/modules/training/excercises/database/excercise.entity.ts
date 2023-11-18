import { Schema } from "mongoose";
import { Excercise } from "../excercise.model";
import { Muscles } from "../muscles.enum";
import { v4 as uuidv4 } from "uuid";

export interface ExcerciseEntity {
  _id: string;
  name: string;
  muscle: Muscles;
  loads: Map<string, number>;
}

export const excerciseSchema = new Schema<ExcerciseEntity>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  muscle: { type: String, required: true },
  loads: { type: Map, required: false },
});

export function toModel(entity: ExcerciseEntity): Excercise {
  return {
    id: entity._id,
    name: entity.name,
    muscle: entity.muscle,
    loads: entity.loads ?? {},
  };
}

export function toEntity(model: Excercise): ExcerciseEntity {
  return {
    _id: model.id ?? uuidv4(),
    name: model.name,
    muscle: model.muscle,
    loads: model.loads ?? new Map<string, number>(),
  };
}
