import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { dateLocale, dateFormatOptions } from "../config/date-format.config";

export interface Routine {
  id: string;
  /* As ISO String */
  createdAt: String;
  name: string;
}

export function mapDbEntityToModel(item: Record<string, AttributeValue>): Routine {
  return {
    id: item.id.S!,
    name: item.name.S!,
    createdAt: new Date(item.createdAt.S!).toLocaleDateString(
      dateLocale,
      dateFormatOptions
    ),
  };
}