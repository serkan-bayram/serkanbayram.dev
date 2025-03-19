import { useQuery } from "@tanstack/react-query";
import { fetchAuth } from "./api/fetch";

export function useAuth() {
  const query = useQuery({
    queryKey: ["auth"],
    queryFn: fetchAuth,
  });

  const isAuthenticated = !!query.data;

  return { isAuthenticated };
}
