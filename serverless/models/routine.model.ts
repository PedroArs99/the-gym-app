import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { dateLocale, dateFormatOptions } from "../config/date-format.config";
import { Excercise } from "./excercise.model";
import { Muscles } from "./muscles.enum";

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
  excercises: WorkoutExcercise[];
}

export type WorkoutExcercise = {
  excercise: Excercise;
  series: number;
  reps: number;
  // TODO: Track weights
};

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
    workouts: flattenWorkouts(item.workouts?.L ?? []),
  };
}

function flattenWorkouts(workouts: AttributeValue[]): Workout[] {
  return workouts
    .filter(workout => !!workout.M)
    .map((workout) => workout.M!)
    .map((workout) => ({
      number: +workout.number.N!,
      excercises: flattenExcercises(workout.excercises.L ?? []),
    }));
}

function flattenExcercises(excercises: AttributeValue[]): WorkoutExcercise[] {
  return excercises
    .map(workoutExcercise => (workoutExcercise.M!))
    .map(({excercise, reps, series}) => ({
      excercise: {
        id: excercise.M!.id.S!,
        muscle: excercise.M!.muscle.S! as Muscles,
        name: excercise.M!.name.S!,
      },
      reps: +reps.N!,
      series: +series.N!,
    }))
}