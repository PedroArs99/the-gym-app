import { HttpRequest } from "../models/http-request";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const EXCERCISES_TABLE = process.env.EXCERCISES_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

module.exports.handler = async (event: HttpRequest) => {
  try {
    console.log(event);
    const excerciseId = event.pathParameters["id"];

    const params = {
      TableName: EXCERCISES_TABLE,
      Key: {
        id: excerciseId,
      },
    };

    await dynamoDbClient.send(new DeleteCommand(params));

    return {
      statusCode: 204,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: error,
    };
  }
};
