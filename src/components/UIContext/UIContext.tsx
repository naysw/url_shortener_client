import React from "react";

interface InitialState {
  dialog: {
    name: DIALOG_VIEWS | "";
    data?: any;
  };
}

const initialState: InitialState = {
  dialog: {
    name: "",
    data: null,
  },
};

type Action = {
  type: "SET_DIALOG";
  payload: {
    name: DIALOG_VIEWS;
    data?: any;
  };
};

type DIALOG_VIEWS = "LINK_STATISTICS_DIALOG";

export const UIContext = React.createContext<InitialState | any>(initialState);

export function uiReducer(state: InitialState, action: Action): InitialState {
  switch (action.type) {
    case "SET_DIALOG": {
      return {
        ...state,
        dialog: {
          name: action.payload.name,
          data: action.payload.data,
        },
      };
    }

    default:
      return state;
  }
}

export const UIProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const setDialog = React.useCallback(
    (payload: { name: DIALOG_VIEWS; data?: any }) =>
      dispatch({ type: "SET_DIALOG", payload }),
    [dispatch],
  );

  const value = React.useMemo(
    () => ({
      ...state,
      setDialog,
    }),
    [state, setDialog],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

type ContextState = InitialState & {
  setDialog: (payload: { name: DIALOG_VIEWS | string; data?: any }) => void;
};

export function useUI() {
  const context = React.useContext<ContextState>(UIContext);

  if (context === undefined)
    throw new Error(`useUI must be used within a UIProvider`);

  return context;
}
