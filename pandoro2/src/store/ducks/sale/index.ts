import { createActions, createReducer } from "reduxsauce";

import { SaleState, SaleTypes, SaleAction } from "./types";
import items from "../items";

export const { Types, Creators } = createActions<SaleTypes>({
  addItem: ["item"],
  deleteSale: [],
  setFrete: ["frete"],
  setFormaPagamento: ["forma_pagamento"],
  removeItem: ["product_id"],
  setValue: ["value"],
  setSale: ["id"],
});

const INITIAL_STATE: SaleState = {
  items: [],
  frete: 0,
  total: 0,
  troco: 0,
  value: 0,
  forma_pagamento: {},
  observacao: null,
  volumeTotal: 0,
};

const addItem = (
  state: SaleState = INITIAL_STATE,
  action: SaleAction
): SaleState => {
  let total = 0;
  const item = action.payload.item;
  const newItems = [
    ...state.items.filter((itemSale) => itemSale.id !== item.id),
    { ...item, id: state.items.length + Math.random() },
  ];
  newItems.forEach((item) => (total += item.total));
  const troco = !!state.value ? state.value - total : 0;
  const total_com_frete = total + state?.frete;
  // const itens_selecionados = [ ...state.itens_selecionados, item.product_id ];
  let quantidade = 0;
  newItems.forEach((item) => {
    quantidade += item.quantity;
  });
  return {
    ...state,
    items: newItems,
    total,
    troco,
    total_com_frete,
    volumeTotal: quantidade,
  };
};

const removeItem = (
  state: SaleState = INITIAL_STATE,
  action: SaleAction
): SaleState => {
  let total = 0;
  const newItems = state?.items?.filter(
    (item) => item.id !== action.payload.id
  );
  newItems.forEach((item) => (total += item.total));
  const total_com_frete = total + state?.frete;
  // const itens_selecionados = state.itens_selecionados.filter(id => action.payload.product_id !== id);
  let quantidade = 0;
  newItems.forEach((item) => {
    quantidade += item.quantity;
  });
  return {
    ...state,
    items: newItems,
    total,
    total_com_frete,
    volumeTotal: quantidade,
  };
};

const deleteSale = (): SaleState => {
  return INITIAL_STATE;
};

const setFrete = (
  state: SaleState = INITIAL_STATE,
  action: SaleAction
): SaleState => {
  const frete = action.payload.frete;
  const total_com_frete = Number(state.total + frete);
  return { ...state, total_com_frete };
};

const setFormaPagamento = (
  state: SaleState = INITIAL_STATE,
  action: SaleAction
): SaleState => {
  return { ...state, forma_pagamento: action.payload.forma_pagamento };
};

const setValue = (
  state: SaleState = INITIAL_STATE,
  action: SaleAction
): SaleState => {
  const value = action.payload.value;
  const troco = value - state.total_com_frete;
  return { ...state, value, troco };
};

const setSale = (
  state: SaleState = INITIAL_STATE,
  action: SaleAction
): SaleState => {
  return { ...state, ...action.payload };
};

export default createReducer(INITIAL_STATE, {
  [Types.ADD_ITEM]: addItem,
  [Types.REMOVE_ITEM]: removeItem,
  [Types.DELETE_SALE]: deleteSale,
  [Types.SET_FRETE]: setFrete,
  [Types.SET_FORMA_PAGAMENTO]: setFormaPagamento,
  [Types.SET_VALUE]: setValue,
  [Types.SET_SALE]: setSale,
});
