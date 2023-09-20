import type { Excercise } from "$lib/models/excercise.model";
import { writable } from "svelte/store";

export let excercisesStore = writable(new Array<Excercise>);