import { HttpRequest } from "../../models/http-request.model";
import {
  DynamoDBClient,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Routine, mapDbEntityToModel } from "../../models/routine.model";

const ROUTINES_TABLE = process.env.ROUTINES_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

module.exports.handler = async (event: HttpRequest) => {
  try {
    const routineId = event.pathParameters["id"];

    const queryResult = await dynamoDbClient.send(
      new GetItemCommand({
        ConsistentRead: true,
        Key: {
          id: {
            S: routineId,
          },
        },
        TableName: ROUTINES_TABLE,
      })
    );

    const item = queryResult.Item;

    if (item) {
      const response: Routine = mapDbEntityToModel(item);

      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    } else {
      return {
        statusCode: 404,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: error,
    };
  }
};
