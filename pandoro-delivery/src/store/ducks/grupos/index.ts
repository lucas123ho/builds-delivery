import { createActions, createReducer } from "reduxsauce";

import { GruposState, GruposTypes, GruposAction } from "./types";

export const { Types, Creators } = createActions<GruposTypes>({
  setGrupos: ["items"],
});

const INITIAL_STATE: GruposState = {
  items: [],
  withProdutos: [],
  combos: []
};

const setGrupos = (state: GruposState, action: GruposAction): GruposState => ({
  ...state,
  ...action.payload
});

export default createReducer(INITIAL_STATE, {
  [Types.SET_GRUPOS]: setGrupos
});
