import { Excercise } from "../excercise.model";
import { Muscles } from "../muscles.enum";

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
