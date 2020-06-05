import { PedidosCliente } from "@root/types/db";

export interface PedidosState extends PedidosCliente {}

export interface PedidosTypes {
  SET_PEDIDOS: string;
}

export interface PedidosAction {
  type: string,
  payload: PedidosState
}