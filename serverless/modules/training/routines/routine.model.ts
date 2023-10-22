import { Excercise } from "../excercises/excercise.model";

export interface Routine {
  createdAt: Date;
  id: string;
  name: string;
  workouts: Workout[];
}

export interface Workout {
  id: string;
  number: number;
  excercises: WorkoutExcercise[];
}

export type WorkoutExcercise = {
  excercise: Excercise;
  series: number;
  reps: number;
};