export interface Training {
  date: Date;
  routineId: string;
  workoutId: string;
  excercisesLoad: Record<string, number>;
}