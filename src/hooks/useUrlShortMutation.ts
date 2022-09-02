import { useMutation } from "@tanstack/react-query";
import { makeShort } from "../api/url";

export function useUrlShortMutation() {
  return useMutation(makeShort);
}
