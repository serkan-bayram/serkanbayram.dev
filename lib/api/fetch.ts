import { z } from "zod";
import { client } from "./mutations";
import { WorkItem, WorkSchema } from "../schemas";

export async function fetchWorks(): Promise<WorkItem[]> {
  const { data, error } = await client.GET("/api/Works");

  if (error) {
    throw new Error("Something went wrong while fetching works: ", error);
  }

  const parsedData = z.array(WorkSchema).parse(data);

  return parsedData;
}
