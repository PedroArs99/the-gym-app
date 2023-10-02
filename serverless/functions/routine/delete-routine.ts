import { HttpRequest } from "../../models/http-request.model";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const ROUTINES_TABLE = process.env.ROUTINES_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

module.exports.handler = async (event: HttpRequest) => {
  try {
    const routineId = event.pathParameters["id"];

    const params = {
      TableName: ROUTINES_TABLE,
      Key: {
        id: routineId,
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
