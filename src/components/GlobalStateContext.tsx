import { Context, createContext, Dispatch } from 'react';

import { GlobalAction, GlobalState } from '../utils/globalStateReducer';

export interface IGlobalStateContext {
  globalState: GlobalState;
  globalStateDispatch: Dispatch<GlobalAction<any>>;
}

export const GlobalStateContext: Context<IGlobalStateContext> = createContext<
  IGlobalStateContext
>({} as IGlobalStateContext);
