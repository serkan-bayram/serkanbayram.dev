import { z } from "zod";
import { client } from "./mutations";
import { WorkItem, workSchema } from "../schemas";

export async function fetchWorks(): Promise<WorkItem[]> {
  try {
    const { data } = await client.GET("/api/Works");

    const parsedData = z.array(workSchema).parse(data);

    return parsedData;
  } catch (error) {
    console.error("Error while fetching the works: ", error);
    throw new Error("Something went wrong");
  }
}

export async function fetchAuth(): Promise<boolean> {
  try {
    const { response } = await client.GET("/api/Auth/check");

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}
