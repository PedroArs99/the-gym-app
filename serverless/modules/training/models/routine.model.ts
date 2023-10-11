export interface Routine {
  createdAt: Date | string;
  id: string;
  name: string;
  workouts: Workout[];
}

export interface Workout {
  number: number;
  excercises: WorkoutExcercise[];
}

export type WorkoutExcercise = {
  excercise: string;
  series: number;
  reps: number;
};