import { useLocalStorage } from "react-use";
import { URL_HISTORY_KEY } from "../config/constants";
import { UrlModel } from "../types";

const initialValues: UrlModel[] = [];

export const useLinkHistory = () => {
  const [value, setValue, removeValue] = useLocalStorage<UrlModel[]>(
    URL_HISTORY_KEY,
    initialValues,
  );

  return { history: value, setHistory: setValue };
};
