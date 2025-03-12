import createClient from "openapi-fetch";
import { useMutation } from "@tanstack/react-query";
import { paths } from "./schema";
import { SaveWork } from "../schemas";

export const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_BASE_URL,
});

export function useSaveWorkMutation() {
  return useMutation({
    mutationFn: async (work: SaveWork) => {
      const { data, error } = await client.POST("/api/Works", {
        body: {
          name: work.workName,
          description: work.workDescription,

          link: work.workLink || null,
          imageSource: work.workImage || null,
          status: work.workStatus || null,

          repoLinks: work.workRepos,
        },
      });

      console.log(data, error);
    },
  });
}
