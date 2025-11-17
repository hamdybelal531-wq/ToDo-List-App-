import { ReducerContext } from "./contextreducer";
import Reducerlogic from "./reducerlogic";
import { useReducer } from "react";

export function ProviderReducer({ children }) {
  const [state, dispatch] = useReducer(Reducerlogic, []);
  return (
    <>
      <ReducerContext.Provider value={{ state, dispatch }}>
        {children}
      </ReducerContext.Provider>
    </>
  );
}
