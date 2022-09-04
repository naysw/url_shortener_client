import { useQuery } from "@tanstack/react-query";
import { fetctLinkDetails } from "../api/link";

export const useLinkDetailsQuery = (linkId: string) => {
  return useQuery([linkId], () => fetctLinkDetails(linkId), {
    enabled: !!linkId,
  });
};
