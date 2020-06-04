import { createActions, createReducer } from "reduxsauce";

import { PedidosState, PedidosTypes, PedidosAction } from "./types";

export const { Types, Creators } = createActions<PedidosTypes>({
  setPedidos: ["registred", "user_registered"],
});

const INITIAL_STATE: PedidosState = {
  pedidos: [],
  pedidos_abertos: []
};

const setPedidos = (state: PedidosState, action: PedidosAction): PedidosState => ({
  ...action.payload
});


export default createReducer(INITIAL_STATE, {
  [Types.SET_PEDIDOS]: setPedidos
});
