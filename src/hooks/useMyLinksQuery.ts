import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchMyLinks } from "../api/link";
import { QUERY_KEYS } from "../config/constants";
import { LinkModel, ServerResponse } from "../types";

/**
 * fetch my link query hook
 *
 * @returns UseQueryResult<ServerResponse<LinkModel[]>, unknown>
 */
export const useMyLinksQuery = (): UseQueryResult<
  ServerResponse<LinkModel[]>,
  Error
> => {
  return useQuery([QUERY_KEYS.LINKS], fetchMyLinks);
};
