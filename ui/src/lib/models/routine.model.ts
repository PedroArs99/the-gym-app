import type { Excercise } from "./excercise.model";

export interface Routine {
  id: string;
  createdAt: Date;
  name: string;
  workouts: Workout[];
}

export interface Workout {
  number: number;
  excercises: WorkoutExcercise[];
}

export type WorkoutExcercise = {
	excercise: Excercise;
	series: number;
	reps: number;
};
