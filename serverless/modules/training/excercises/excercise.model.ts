import { Muscles } from "./muscles.enum";

export type Excercise = {
  id?: string;
  name: string;
  muscle: Muscles;
}