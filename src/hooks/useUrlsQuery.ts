import { useQuery } from "@tanstack/react-query";
import { fetchManyUrls } from "../api/link";

export const useUrlsQuery = (payload: any) => {
  return useQuery(["urls", payload], () => fetchManyUrls(payload));
};
