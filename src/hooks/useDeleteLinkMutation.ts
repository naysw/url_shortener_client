import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteUrl } from "../api/link";
import { QUERY_KEYS } from "../config/constants";
import { LinkModel, ServerResponse } from "../types";

/**
 * user delete link mutation
 *
 * @returns UseMutationResult<ServerResponse<LinkModel>,Error,string,void>
 */
export const useDeleteLinkMutation = (): UseMutationResult<
  ServerResponse<LinkModel>,
  Error,
  string,
  void
> => {
  const queryClient = useQueryClient();

  return useMutation(deleteUrl, {
    onMutate: () => {
      // queryClient.
    },
    onSettled: () => {
      queryClient.invalidateQueries([QUERY_KEYS.LINKS]);
    },
  });
};
