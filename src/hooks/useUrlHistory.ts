import { useLocalStorage } from "react-use";
import { URL_HISTORY_KEY } from "../config/constants";
import { UrlModel } from "../types";

export const useUrlHistory = () => {
  const [value, setValue, removeValue] =
    useLocalStorage<UrlModel[]>(URL_HISTORY_KEY);

  return { history: value, setHistory: setValue };
};
