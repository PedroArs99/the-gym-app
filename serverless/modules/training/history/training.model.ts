export interface Training {
  id?: string;
  date: Date;
  routineId: string;
  workoutId: string;
  excercisesLoad: Record<string, number>
}