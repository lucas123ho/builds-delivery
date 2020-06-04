import { createActions, createReducer } from "reduxsauce";

import { ConfigState, ConfigTypes, ConfigAction } from "./types";

export const { Types, Creators } = createActions<ConfigTypes>({
  setConfig: ["registred", "user_registered"],
});

const INITIAL_STATE: ConfigState = {
  Store_Id: null,
  qtdVolumeMax: null,
  vlTrocoMin: null,
  vlTrocoMax: null,
  DistanciaKmMax: null,
  vlFreteInicial: null,
  Latitude: null,
  Longitude: null,
  FatorKmFrete: null,
  usaKmCobertura: null,
  usaFreteFixo: null,
};

const setConfig = (state: ConfigState, action: ConfigAction): ConfigState => ({
  ...state,
  ...action.payload
});

export default createReducer(INITIAL_STATE, {
  [Types.SET_CONFIG]: setConfig
});
