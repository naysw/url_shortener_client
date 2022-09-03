import { useQuery } from "@tanstack/react-query";
import { fetchManyUrls } from "../api/link";
import { QUERY_KEYS } from "../config/constants";

export const useUrlsQuery = (payload: any) => {
  return useQuery([QUERY_KEYS.LINKS, payload], () => fetchManyUrls(payload));
};
