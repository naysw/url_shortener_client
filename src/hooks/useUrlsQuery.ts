import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchLinks } from "../api/link";
import { QUERY_KEYS } from "../config/constants";
import { FetchLinksQuery, LinkModel, ServerResponse } from "../types";

/**
 * fetch link query hook
 *
 * @returns UseQueryResult<ServerResponse<LinkModel[]>, unknown>
 */
export const useLinksQuery = (
  payload: FetchLinksQuery,
): UseQueryResult<ServerResponse<LinkModel[]>, Error> => {
  return useQuery([QUERY_KEYS.LINKS, payload], () => fetchLinks(payload));
};
