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
    console.log("Error on fetchAuth: ", error);
    return false;
  }
}

export async function fetchStatus(): Promise<string> {
  try {
    const { data } = await client.GET("/api/Status");

    if (!data?.status) return "Inactive";

    return data.status;
  } catch (error) {
    console.log("Error on fetchStatus: ", error);

    return "Inactive";
  }
}
