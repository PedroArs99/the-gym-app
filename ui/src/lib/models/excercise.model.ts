import type { Muscles } from './muscles.enum';

export type Excercise = {
	id?: string;
	name: string;
	muscle: Muscles;
	loads: Map<string, number>;
};

export function getExcerciseLastLoad(excercise: Excercise) {
	const loads = Object.values(excercise.loads ?? {}).sort((a, b) => a - b);
	return loads.pop();
}
