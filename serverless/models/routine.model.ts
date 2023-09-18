import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { dateLocale, dateFormatOptions } from "../config/date-format.config";
import { Excercise } from "./excercise.model";

export interface Routine {
  id: string;
  /* As ISO String */
  createdAt: String;
  name: string;
  workouts: Workout[];
}

export function isRoutineValid(routine: Routine): boolean {
  return !!routine.name;
}

export interface Workout {
  number: number;
  excercises: Excercise[];
}

export function mapDbEntityToModel(
  item: Record<string, AttributeValue>
): Routine {
  return {
    id: item.id.S!,
    createdAt: new Date(item.createdAt.S!).toLocaleDateString(
      dateLocale,
      dateFormatOptions
    ),
    name: item.name.S!,
    workouts: flattenWorkouts(item.workouts.L ?? []),
  };
}

function flattenWorkouts(workouts: AttributeValue[]): Workout[] {
  return workouts
    .filter(workout => !!workout.M)
    .map((workout) => workout.M!)
    .map((workout) => ({
      number: +workout.number.N!,
      excercises: new Array<Excercise>,
    }));
}
