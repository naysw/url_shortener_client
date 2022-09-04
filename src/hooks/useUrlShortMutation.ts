import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { makeShort } from "../api/link";
import { QUERY_KEYS } from "../config/constants";
import { LinkModel, MakeShortMutatonPayload, ServerResponse } from "../types";

/**
 * use url short mutation
 *
 * @returns UseMutationResult<ServerResponse<LinkModel>, unknown, MakeShortMutatonPayload, unknown>
 */
export const useUrlShortMutation = (): UseMutationResult<
  ServerResponse<LinkModel>,
  Error,
  MakeShortMutatonPayload,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation(makeShort, {
    onSuccess: ({ data }) => {
      // queryClient.setQueryData([QUERY_KEYS.LINKS], data);
      queryClient.invalidateQueries([QUERY_KEYS.LINKS]);
    },
  });
};
