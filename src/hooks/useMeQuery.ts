import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../api/users";

interface Options {
  enabled: boolean;
  onError: (...args: any) => void;
}

export const useMeQuery = ({ enabled, onError }: Options) => {
  return useQuery(["me"], fetchMe, { enabled: !!enabled });
};
