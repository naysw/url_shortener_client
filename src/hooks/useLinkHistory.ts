import { useLocalStorage } from "react-use";
import { URL_HISTORY_KEY } from "../config/constants";
import { LinkModel } from "../types";

const initialValues: LinkModel[] = [];

export const useLinkHistory = () => {
  const [value, setValue] = useLocalStorage<LinkModel[]>(
    URL_HISTORY_KEY,
    initialValues,
  );

  return { history: value, setHistory: setValue };
};
