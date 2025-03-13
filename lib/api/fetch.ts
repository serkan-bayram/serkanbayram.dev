import { z } from "zod";
import { client } from "./mutations";
import { WorkItem, workSchema } from "../schemas";

type APIResponse<T> = {
  data: T[] | null;
  error: string | null;
};

export async function fetchWorks(): Promise<APIResponse<WorkItem>> {
  try {
    // error: Non 200 Status Response (Does not throw automatically)
    const { data, error } = await client.GET("/api/Works");

    if (error) {
      return { data: null, error: error };
    }

    const parsedData = z.array(workSchema).parse(data);

    return { data: parsedData, error: null };
  } catch (error) {
    // error: Something went wrong while fetching
    console.error("Error while fetching the works: ", error);
    return { data: null, error: "Something went wrong" };
  }
}
