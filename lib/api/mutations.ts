import createClient from "openapi-fetch";
import { useMutation } from "@tanstack/react-query";
import { paths } from "./schema";
import { SaveWork } from "../../components/add-work";

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
          imageSource: work.workImage || null,
          link: work.workLink || null,
          repoLinks: work.workRepos,
          status: work.workStatus || null,
        },
      });

      console.log(data, error);
    },
  });
}
