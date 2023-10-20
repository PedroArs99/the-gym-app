import {
  AttributeValue,
  DynamoDBClient,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

import { Routine, Workout, WorkoutExcercise } from "./routine.model";


const ROUTINES_TABLE = process.env.ROUTINES_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

async function createRoutine(name: string): Promise<Routine> {
  const routine: Routine = {
    createdAt: new Date().toISOString(),
    id: uuidv4(),
    name,
    workouts: []
  }

  const params: PutCommandInput = {
    TableName: ROUTINES_TABLE,
    Item: routine,
  }

  await dynamoDbClient.send(new PutCommand(params));

  return routine;
}

async function getRoutineById(id:string) {
  const queryResult = await dynamoDbClient.send(
    new QueryCommand({
      ConsistentRead: true,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": {
          "S": id
        }
      },
      TableName: ROUTINES_TABLE,
      Limit: 1,
    })
  );
  const item = queryResult.Items?.[0];

  return item ? mapDynamoRecordToModel(item): null;
}

async function getRoutines(): Promise<Routine[]> {
  const queryResult = await dynamoDbClient.send(
    new ScanCommand({
      ConsistentRead: true,
      TableName: ROUTINES_TABLE,
    })
  );

  const items = queryResult.Items ?? [];

  const routines = items.map((item) => mapDynamoRecordToModel(item));

  return routines;
}

function mapDynamoRecordToModel(item: Record<string, AttributeValue>): Routine {
  return {
    createdAt: new Date(item.createdAt.S!),
    id: item.id.S!,
    name: item.name.S!,
    workouts: mapWorkoutRecordsToModel(item.workouts.L ?? []),
  };
}

function mapWorkoutRecordsToModel(records: AttributeValue[]): Workout[] {
  return records
    .filter((workout) => !!workout.M)
    .map((workout) => workout.M!)
    .map((workout) => ({
      number: +workout.number.N!,
      excercises: mapExcerciseRecordsToModel(workout.excercises.L ?? []),
    }));
}

function mapExcerciseRecordsToModel(
  records: AttributeValue[]
): WorkoutExcercise[] {
  return records
    .map((workoutExcercise) => workoutExcercise.M!)
    .map(({ excercise, reps, series }) => ({
      excercise: excercise.M!.id.S!,
      reps: +reps.N!,
      series: +series.N!,
    }));
}

const RoutinesRepository = {
  createRoutine,
  getRoutineById,
  getRoutines,
}

export default RoutinesRepository;