import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUrl } from "../api/link";
import { QUERY_KEYS } from "../config/constants";

export const useDeleteLinkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteUrl, {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.LINKS]);
    },
  });
};
