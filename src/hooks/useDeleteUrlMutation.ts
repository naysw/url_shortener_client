import { useMutation } from "@tanstack/react-query";
import { deleteUrl } from "../api/url";

export const useDeleteUrlMutation = () => {
  return useMutation(deleteUrl);
};
