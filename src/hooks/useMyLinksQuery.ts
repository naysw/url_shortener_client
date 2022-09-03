import { useQuery } from "@tanstack/react-query";
import { fetchMyLinks } from "../api/link";
import { QUERY_KEYS } from "../config/constants";

export const useMyLinksQuery = () => {
  return useQuery([QUERY_KEYS.LINKS], fetchMyLinks);
};
