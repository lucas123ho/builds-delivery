import { createActions, createReducer } from "reduxsauce";

import { RouteState, RouteTypes, RouteAction } from "./types";

export const { Types, Creators } = createActions<RouteTypes>({
  setRoute: ["registred", "user_registered"],
});

const INITIAL_STATE: RouteState = {
  registred: false,
};

const setRoute = (state: RouteState, action: RouteAction): RouteState => ({
  ...state,
  ...action.payload
});

export default createReducer(INITIAL_STATE, {
  [Types.SET_ROUTE]: setRoute
});
