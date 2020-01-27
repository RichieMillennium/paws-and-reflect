import { Reducer, Dispatch } from 'react';

const SET_IS_LOADING_ACTION_TYPE = Symbol('is loading action type');
const SET_SEARCH_HANDLER_ACTION_TYPE = Symbol('search handler action type');
const SET_SELECTED_VIEW_ACTION_TYPE = Symbol('search handler action type');
const SET_ALERT_MESSAGE = Symbol('alert message action type');

export type IsLoading = boolean;
export type HeaderSearchHandler = (searchText: string) => void;
export type SelectedView = string;
export interface AlertMessage {
  severity: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export interface GlobalState {
  isLoading: IsLoading;
  headerSearchHandler?: HeaderSearchHandler;
  selectedView: SelectedView;
  alertMessage?: AlertMessage;
}

export interface GlobalAction<T> {
  type: Symbol;
  payload: T;
}

type GlobalActionFunction<T> = (
  dispatch: Dispatch<GlobalAction<T>>
) => (value: any) => void;

// type guards

const isLoadingAction = (
  action: GlobalAction<any>
): action is GlobalAction<IsLoading> => {
  return action.type === SET_IS_LOADING_ACTION_TYPE;
};

const isHeaderSearchHandlerAction = (
  action: GlobalAction<any>
): action is GlobalAction<HeaderSearchHandler> => {
  return action.type === SET_SEARCH_HANDLER_ACTION_TYPE;
};

const isSelectedViewAction = (
  action: GlobalAction<any>
): action is GlobalAction<SelectedView> => {
  return action.type === SET_SELECTED_VIEW_ACTION_TYPE;
};

const isAlertMessageAction = (
  action: GlobalAction<any>
): action is GlobalAction<AlertMessage> => {
  return action.type === SET_ALERT_MESSAGE;
};

// reducer

export const globalStateReducer: Reducer<GlobalState, GlobalAction<any>> = (
  state,
  action
) => {
  if (isLoadingAction(action)) {
    return {
      ...state,
      isLoading: action.payload
    };
  }
  if (isHeaderSearchHandlerAction(action)) {
    return {
      ...state,
      headerSearchHandler: action.payload
    };
  }
  if (isSelectedViewAction(action)) {
    return {
      ...state,
      selectedView: action.payload
    };
  }
  if (isAlertMessageAction(action)) {
    return {
      ...state,
      alertMessage: action.payload
    };
  }

  return state;
};

// action functions

export const setIsLoadingAction: GlobalActionFunction<IsLoading> = dispatch => (
  isLoading: IsLoading
) => {
  dispatch({
    type: SET_IS_LOADING_ACTION_TYPE,
    payload: isLoading
  });
};

export const setHeaderSearchHandlerAction: GlobalActionFunction<HeaderSearchHandler> = dispatch => (
  handler: HeaderSearchHandler
) => {
  dispatch({
    type: SET_SEARCH_HANDLER_ACTION_TYPE,
    payload: handler
  });
};

export const setSelectedViewAction: GlobalActionFunction<SelectedView> = dispatch => (
  selectedView: SelectedView
) => {
  dispatch({
    type: SET_SELECTED_VIEW_ACTION_TYPE,
    payload: selectedView
  });
};

export const setAlertMessageAction: GlobalActionFunction<AlertMessage> = dispatch => (
  alertMessage: AlertMessage
) => {
  dispatch({
    type: SET_ALERT_MESSAGE,
    payload: alertMessage
  });
};
