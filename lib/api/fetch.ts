import { z } from "zod";
import { client } from "./mutations";
import { WorkItem, workSchema } from "../schemas";

export async function fetchWorks(): Promise<WorkItem[]> {
  const { data, error } = await client.GET("/api/Works");

  if (error) {
    throw new Error("Something went wrong while fetching works: ", error);
  }

  const parsedData = z.array(workSchema).parse(data);

  return parsedData;
}
