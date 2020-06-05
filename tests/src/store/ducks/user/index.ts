import { createActions, createReducer } from "reduxsauce";

import { UserState, UserTypes, UserAction } from "./types";

export const { Types, Creators } = createActions<UserTypes>({
  setUser: [
    "nome",
    "cpf",
    "telefone",
    "estado",
    "cidade",
    "bairro",
    "logradouro",
    "numero",
    "latitude",
    "longitude"
  ],
  setUsersIds: ["id"]
});

const INITIAL_STATE: UserState = {
  id: null,
  nome: null,
  cpf: null,
  telefone: null,
  cep: null,
  formatted_address: null,
  numero: null,
  complemento: null,
  users_ids: [],
  latitude: null,
  longitude: null
};

const setUser = (state: UserState, action: UserAction): UserState => ({
  ...state,
  ...action.payload,
});

const setUsersIds = (state: UserState, action: UserAction): UserState => {
  const id = action.payload.id;
  if (state?.users_ids?.indexOf(id) === -1 || !state?.users_ids) {
    return { ...state, users_ids: [...state.users_ids, id] };
  } else {
    return { ...state };
  }
};

export default createReducer(INITIAL_STATE, {
  [Types.SET_USER]: setUser,
  [Types.SET_USERS_IDS]: setUsersIds
});
