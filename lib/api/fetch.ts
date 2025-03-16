import { z } from "zod";
import { client } from "./mutations";
import { WorkItem, workSchema } from "../schemas";

type APIResponse<T> = {
  data: T[] | null;
  error: string | null;
};

export async function fetchWorks(): Promise<APIResponse<WorkItem>> {
  try {
    const { data } = await client.GET("/api/Works");

    const parsedData = z.array(workSchema).parse(data);

    return { data: parsedData, error: null };
  } catch (error) {
    console.error("Error while fetching the works: ", error);
    return { data: null, error: "Something went wrong" };
  }
}

export async function fetchAuth(): Promise<boolean> {
  try {
    // TODO: Why this error says it's undefined when 401 comes
    const { response } = await client.GET("/api/Auth/check");

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}
