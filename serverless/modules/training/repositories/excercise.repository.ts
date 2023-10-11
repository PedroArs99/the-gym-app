import { AttributeValue, DynamoDBClient, QueryCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

import { Excercise } from "../models/excercise.model";
import { Muscles } from "../models/muscles.enum";

const EXCERCISES_TABLE = process.env.EXCERCISES_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

async function getExcercises(): Promise<Excercise[]> {
  const queryResult = await dynamoDbClient.send(
    new ScanCommand({
      ConsistentRead: true,
      TableName: EXCERCISES_TABLE,
    })
  );

  const items = queryResult.Items ?? [];

  const excercises = items.map((item) => mapDynamoRecordToModel(item));

  return excercises;
}

function mapDynamoRecordToModel(record: Record<string, AttributeValue>): Excercise {
  return {
    id: record.id.S!,
    name: record.name.S!,
    muscle: record.muscle.S! as Muscles,
  };
}

const ExcerciseRepository = {
  getExcercises,
}

export default ExcerciseRepository;