import { useMutation } from "@tanstack/react-query";
import { deleteUrl } from "../api/link";

export const useDeleteLinkMutation = () => {
  return useMutation(deleteUrl);
};
