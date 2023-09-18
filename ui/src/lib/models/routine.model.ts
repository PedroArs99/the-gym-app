import type { Excercise } from "./excercise.model";

export interface Routine {
  id: string;
  createdAt: Date;
  name: string;
  workouts: Workout[];
}

export interface Workout {
  number: number;
  excercises: Excercise[];
}