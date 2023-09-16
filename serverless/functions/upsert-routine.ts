import { HttpRequest } from "../models/http-request.model";
import { v4 as uuidv4 } from "uuid";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Routine } from "../models/routine.model";

const ROUTINES_TABLE = process.env.ROUTINES_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

module.exports.handler = async (event: HttpRequest) => {
  const routine: Routine = JSON.parse(event.body);

  if (!routine.id) {
    routine.id = uuidv4();
    routine.createdAt = new Date().toISOString();
  }

  const params = {
    TableName: ROUTINES_TABLE,
    Item: routine,
  };

  try {
    await dynamoDbClient.send(new PutCommand(params));
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: error,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(routine, null, 2),
  };
};
