import { useQuery } from "@tanstack/react-query";
import { fetchManyUrls } from "../api/url";

export const useUrlsQuery = (payload: any) => {
  return useQuery(["urls", payload], () => fetchManyUrls(payload));
};
