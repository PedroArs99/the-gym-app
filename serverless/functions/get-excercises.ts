import { HttpRequest } from "../models/http-request.model";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const EXCERCISES_TABLE = process.env.EXCERCISES_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

module.exports.handler = async (event: HttpRequest) => {
  try {
    const queryResult = await dynamoDbClient.send(
      new ScanCommand({
        TableName: EXCERCISES_TABLE,
        ConsistentRead: true,
      })
    );

    const items = queryResult.Items ?? [];

    const response = items
      .map((item) => ({
        id: item.id.S!,
        name: item.name.S!,
        muscle: item.muscle.S!,
      }))
      .sort((a, b) =>
        a.muscle.localeCompare(b.muscle) !== 0
          ? a.muscle.localeCompare(b.muscle)
          : a.name.localeCompare(b.name)
      );

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: error,
    };
  }
};
