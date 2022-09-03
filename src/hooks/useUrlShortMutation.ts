import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeShort } from "../api/link";
import { QUERY_KEYS } from "../config/constants";

export function useUrlShortMutation() {
  const queryClient = useQueryClient();

  return useMutation(makeShort, {
    onSuccess: ({ data }) => {
      // queryClient.setQueryData([QUERY_KEYS.LINKS], data);
      queryClient.invalidateQueries([QUERY_KEYS.LINKS]);
    },
  });
}
