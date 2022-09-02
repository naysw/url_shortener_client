import { useMutation } from "@tanstack/react-query";
import { makeShort } from "../api/link";

export function useUrlShortMutation() {
  return useMutation(makeShort);
}
