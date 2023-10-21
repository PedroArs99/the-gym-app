import { Excercise } from "../excercise.model";
import { Muscles } from "../muscles.enum";
import { v4 as uuidv4 } from "uuid";

export interface ExcerciseEntity {
  _id: string;
  name: string;
  muscle: Muscles;
}

export function toModel(entity: ExcerciseEntity): Excercise {
  return {
    id: entity._id,
    name: entity.name,
    muscle: entity.muscle,
  };
}

export function toEntity(model: Excercise): ExcerciseEntity {
  return {
    _id: model.id ?? uuidv4(),
    name: model.name,
    muscle: model.muscle,
  }
}
