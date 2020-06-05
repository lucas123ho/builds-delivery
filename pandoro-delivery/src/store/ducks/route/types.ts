export interface RouteState {
  registred?: boolean;
  pedido_aberto?: boolean;
  enviando_pedido?: boolean;
  data_envio_sms?: number;
}

export interface RouteTypes {
  SET_ROUTE: string;
}

export interface RouteAction {
  type: string,
  payload: RouteState
}