import { HttpRequest } from "../../models/http-request.model";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Routine } from "../../models/routine.model";
import { dateLocale, dateFormatOptions } from "../../config/date-format.config";

const ROUTINES_TABLE = process.env.ROUTINES_TABLE;
const client = new DynamoDBClient();
const dynamoDbClient = DynamoDBDocumentClient.from(client);

module.exports.handler = async (event: HttpRequest) => {
  try {
    const queryResult = await dynamoDbClient.send(
      new ScanCommand({
        TableName: ROUTINES_TABLE,
        ConsistentRead: true,
      })
    );

    const items = queryResult.Items ?? [];

    const response: Routine[] = items
      .sort(
        (a, b) =>
          new Date(a.createdAt.S!).getTime() - new Date(b.createdAt.S!).getTime()
      )
      .map((item) => ({
        id: item.id.S!,
        name: item.name.S!,
        createdAt: new Date(item.createdAt.S!).toLocaleDateString(
          dateLocale,
          dateFormatOptions
        ),
      }));

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
