import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetctLinkDetails } from "../api/link";
import { LinkModel, ServerResponse } from "../types";

/**
 * use link detail query hook
 *
 * @param linkId string
 * @returns
 */
export const useLinkDetailsQuery = (
  linkId: string,
): UseQueryResult<ServerResponse<LinkModel>, Error> => {
  return useQuery([linkId], () => fetctLinkDetails(linkId), {
    enabled: !!linkId,
  });
};
