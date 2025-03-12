import createClient from "openapi-fetch";
import { useMutation } from "@tanstack/react-query";
import { paths } from "./schema";
import { SaveWork, WorkItem } from "../schemas";
import { useRouter } from "@tanstack/react-router";

export const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_BASE_URL,
});

export function useSaveWorkMutation() {
  const router = useRouter();

  return useMutation({
    onSuccess: () => {
      router.invalidate();
    },
    mutationFn: async (work: SaveWork) => {
      return new Promise((resolve) => setTimeout(() => resolve, 1000));

      // const { data, error } = await client.POST("/api/Works", {
      //   body: {
      //     name: work.workName,
      //     description: work.workDescription,

      //     link: work.workLink || null,
      //     imageSource: work.workImage || null,
      //     status: work.workStatus || null,

      //     repoLinks: work.workRepos,
      //   },
      // });

      // console.log(data, error);
    },
  });
}

export function useDeleteWorkMutation() {
  const router = useRouter();

  return useMutation({
    onSuccess: () => {
      router.invalidate();
    },
    mutationFn: async (workId: WorkItem["id"]) => {
      return new Promise((resolve) => setTimeout(() => resolve, 1000));

      const { data, error } = await client.DELETE("/api/Works/{id}", {
        params: {
          path: {
            id: workId,
          },
        },
      });

      console.log(data, error);
    },
  });
}

export function useUpdateWorkMutation() {
  const router = useRouter();

  return useMutation({
    onSuccess: () => {
      router.invalidate();
    },
    mutationFn: async ({
      work,
      workId,
    }: {
      work: SaveWork;
      workId: WorkItem["id"];
    }) => {
      const { data, error } = await client.PUT("/api/Works/id", {
        params: {
          query: {
            id: workId,
          },
        },
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
