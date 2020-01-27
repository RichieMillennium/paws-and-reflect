import { Reducer, Dispatch } from 'react';

type DataViewFilters<T> = T[];

type DataViewSorters<T> = T[];

interface Page {
  offset: number;
  take: number;
}

interface Eventful {
  dataViewChangedEvent: Event;
}

interface DataViewEvent<T> {
  value: T;
  nativeEvent: Event | null;
}

type HasOptions<O extends {}> = O;

export interface OptionlessDataViewState<F, S> extends Eventful {
  offset: number;
  take: number;
  filters: DataViewFilters<F>;
  sorters: DataViewSorters<S>;
  dataViewChangedEvent: Event;
}

interface Options<O> {
  options: O;
}

export type DataViewState<F, S, O> = OptionlessDataViewState<F, S> & Options<O>;

export interface DataViewAction<T> {
  type: Symbol;
  payload: T;
  event: Event | null;
}

type DataViewActionFunction<T> = (
  dispatch: Dispatch<DataViewAction<T>>
) => (event: DataViewEvent<T>, value?: any) => void;

const PAGE_CHANGE_ACTION_TYPE = Symbol('page change action type');
const FILTER_CHANGE_ACTION_TYPE = Symbol('filter change action type');
const APPLY_FILTER_ACTION_TYPE = Symbol('apply filter action type');
const SORT_CHANGE_ACTION_TYPE = Symbol('sort change action type');
const OPTION_CHANGE_ACTION_TYPE = Symbol('option change action type');

export type DataViewStateReducer<F, S, O> = Reducer<
  DataViewState<F, S, O>,
  DataViewAction<any>
>;

// type guards

const isPageChangeAction = (
  action: DataViewAction<any>
): action is DataViewAction<Page> => {
  return action.type === PAGE_CHANGE_ACTION_TYPE;
};

const isFilterChangeAction = (
  action: DataViewAction<any>
): action is DataViewAction<DataViewFilters<any>> => {
  return action.type === FILTER_CHANGE_ACTION_TYPE;
};

const isApplyFilterAction = (
  action: DataViewAction<any>
): action is DataViewAction<null> => {
  return action.type === APPLY_FILTER_ACTION_TYPE;
};

const isSortChangeAction = (
  action: DataViewAction<any>
): action is DataViewAction<DataViewSorters<any>> => {
  return action.type === SORT_CHANGE_ACTION_TYPE;
};

const isOptionChangeAction = <O>(
  action: DataViewAction<any>
): action is DataViewAction<O> => {
  return action.type === OPTION_CHANGE_ACTION_TYPE;
};

// reducer

const updateLastChangedEvent = (state: Eventful, newEvent: Event | null) => (
  condition: boolean
) => (condition && !!newEvent ? newEvent : state.dataViewChangedEvent);

export const dataViewStateReducer = <F, S, O>(
  state: DataViewState<F, S, O>,
  action: DataViewAction<any>
): DataViewState<F, S, O> => {
  const updateLastEventWhen = updateLastChangedEvent(state, action.event);

  if (isPageChangeAction(action)) {
    return {
      ...state,
      dataViewChangedEvent: updateLastEventWhen(
        action.payload.offset !== state.offset ||
          action.payload.take !== state.take
      ),
      offset: action.payload.offset,
      take: action.payload.take
    };
  }
  if (isFilterChangeAction(action)) {
    return {
      ...state,
      dataViewChangedEvent: updateLastEventWhen(
        action.payload.length < state.filters.length
      ),
      filters: action.payload
    };
  }
  if (isSortChangeAction(action)) {
    return {
      ...state,
      dataViewChangedEvent: updateLastEventWhen(true),
      sorters: action.payload
    };
  }
  if (isApplyFilterAction(action)) {
    return {
      ...state,
      offset: 0,
      dataViewChangedEvent: updateLastEventWhen(true)
    };
  }
  if (isOptionChangeAction<O>(action)) {
    return {
      ...state,
      dataViewChangedEvent: updateLastEventWhen(true),
      options: action.payload
    };
  }
  return state;
};

// action functions

export const setPageAction: DataViewActionFunction<Page> = dispatch => (
  event,
  value?: Page
) => {
  dispatch({
    type: PAGE_CHANGE_ACTION_TYPE,
    payload: event.value || value,
    event: event.nativeEvent
  });
};

export const setFilterAction: DataViewActionFunction<DataViewFilters<
  any
>> = dispatch => (event, value?: DataViewFilters<any>) => {
  dispatch({
    type: FILTER_CHANGE_ACTION_TYPE,
    payload: event.value || value,
    event: event.nativeEvent
  });
};

export const setOrderAction: DataViewActionFunction<DataViewSorters<
  any
>> = dispatch => (event, value?: DataViewSorters<any>) => {
  dispatch({
    type: SORT_CHANGE_ACTION_TYPE,
    payload: event.value || value,
    event: event.nativeEvent
  });
};

export const applyFilterAction: DataViewActionFunction<null> = dispatch => event => {
  dispatch({
    type: APPLY_FILTER_ACTION_TYPE,
    payload: null,
    event: event.nativeEvent
  });
};

export const setOptionsAction: DataViewActionFunction<any> = dispatch => (
  event,
  value?
) => {
  dispatch({
    type: OPTION_CHANGE_ACTION_TYPE,
    payload: event.value || value,
    event: event.nativeEvent
  });
};

// initializer

export const initDataViewState = <F, S, O>(
  take: number,
  options: O
): DataViewState<F, S, O> => ({
  offset: 0,
  take,
  filters: [],
  sorters: [],
  dataViewChangedEvent: new Event(''),
  options
});
