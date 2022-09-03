import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../api/users";

export const useMeQuery = (options?: { enabled?: boolean; onError: any }) => {
  return useQuery(["me"], fetchMe, { enabled: options?.enabled || undefined });
};
