import { Excercise } from "../models/excercise.model";
import { HttpRequest } from "../models/http-request.model";
import { v4 as uuidv4 } from "uuid";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const EXCERCISES_TABLE = process.env.EXCERCISES_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

module.exports.handler = async (event: HttpRequest) => {
  const excercise: Excercise = JSON.parse(event.body);

  if (!excercise.id) {
    excercise.id = uuidv4();
  }

  const params = {
    TableName: EXCERCISES_TABLE,
    Item: excercise,
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
    body: JSON.stringify(excercise, null, 2),
  };
};
