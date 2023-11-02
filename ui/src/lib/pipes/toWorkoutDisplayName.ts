import type { Workout } from "$lib/models/routine.model";
import { toCamelCase } from "./toCamelCase";

export function toWorkoutDisplayName(workout:Workout) {
  const groups = workout.excercises
    .map(({ excercise }) => excercise.muscle)
    .reduce((acc, currentValue) => (acc.includes(currentValue) ? acc : [...acc, currentValue]), new Array<string>())
    .map((group) => toCamelCase(group));
  
  return `Workout #${workout.number} - ${groups}`;
}