import { UserState, UserAction } from '@store/ducks/user/types'
import { Types as UserTypes, Types } from '@store/ducks/user';
import { RouteState, RouteAction } from '@store/ducks/route/types'
import { Types as RouteTypes } from '@store/ducks/route';
import { ConfigState, ConfigAction } from '@store/ducks/config/types'
import { Types as ConfigTypes } from '@store/ducks/config';
import { SalePayload, SaleAction, SaleState } from '@store/ducks/sale/types'
import { Types as SaleTypes } from '@store/ducks/sale';
import { GruposState, GruposAction } from '@root/store/ducks/grupos/types'
import { Types as GruposTypes } from '@root/store/ducks/grupos';
import { PedidosState, PedidosAction } from '@root/store/ducks/pedidos/types'
import { Types as PedidosTypes } from '@root/store/ducks/pedidos';

export function saleAction(payload: SaleState): SaleAction {
  return {
    type: SaleTypes.SET_SALE,
    payload
  }
}

export function userAction(payload: UserState): UserAction {
  return {
    type: UserTypes.SET_USER,
    payload
  }
}

export function routeAction(payload: RouteState): RouteAction {
  return {
    type: RouteTypes.SET_ROUTE,
    payload
  }
}

export function configAction(payload: ConfigState): ConfigAction {
  return {
    type: ConfigTypes.SET_CONFIG,
    payload
  }
}

export function addItemAction(payload: SalePayload): SaleAction {
  return {
    type: SaleTypes.ADD_ITEM,
    payload
  }
}

export function removeItemAction(payload: SalePayload): SaleAction {
  return {
    type: SaleTypes.REMOVE_ITEM,
    payload
  }
}

export function setFreteAction(payload: SalePayload): SaleAction {
  return {
    type: SaleTypes.SET_FRETE,
    payload
  }
}

export function setFormaPagamento(payload: SalePayload): SaleAction {
  return {
    type: SaleTypes.SET_FORMA_PAGAMENTO,
    payload
  }
}

export function setValueAction(payload: SalePayload): SaleAction {
  return {
    type: SaleTypes.SET_VALUE,
    payload
  }
}

export function setGrupos(payload: GruposState): GruposAction {
  return {
    type: GruposTypes.SET_GRUPOS,
    payload
  }
}

export function setUsersIds(payload: UserState): UserAction {
  return {
    type: UserTypes.SET_USERS_IDS,
    payload
  }
}

export function setPedidos(payload: PedidosState): PedidosAction {
  return {
    type: PedidosTypes.SET_PEDIDOS,
    payload
  }
}