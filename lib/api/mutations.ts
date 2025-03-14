import createClient from "openapi-fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paths } from "./schema";
import { SaveWork, WorkItem } from "../schemas";
import { useNavigate, useRouter } from "@tanstack/react-router";

export const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  credentials: "include",
});

export function useSaveWorkMutation() {
  const router = useRouter();

  return useMutation({
    onSuccess: () => {
      router.invalidate();
    },
    mutationFn: (work: SaveWork) =>
      client.POST("/api/Works", {
        body: {
          name: work.workName,
          description: work.workDescription,

          link: work.workLink || null,
          imageSource: work.workImage || null,
          status: work.workStatus || null,

          repoLinks: work.workRepos,
        },
      }),
  });
}

export function useDeleteWorkMutation() {
  const router = useRouter();

  return useMutation({
    onSuccess: () => {
      router.invalidate();
    },
    mutationFn: async (workId: WorkItem["id"]) =>
      client.DELETE("/api/Works/{id}", {
        params: {
          path: {
            id: workId,
          },
        },
      }),
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
    }) =>
      client.PUT("/api/Works/id", {
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
      }),
  });
}

export function useLoginMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    onSuccess: async () => {
      await router.invalidate();
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate({ to: "/" });
    },
    mutationFn: async (password: string) => {
      const { response } = await client.POST("/api/Auth/login", {
        body: {
          password: password,
        },
      });

      if (!response.ok) throw new Error("Unauthorized");
    },
  });
}
