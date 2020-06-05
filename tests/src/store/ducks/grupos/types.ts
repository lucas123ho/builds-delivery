import { GrupoWithSubGrupos, GrupoWithProdutos, Produto } from '../../../types/db';

export interface GruposState {
  items?: GrupoWithSubGrupos[];
  withProdutos?: GrupoWithProdutos[];
  combos?: Produto[];
}

export interface GruposTypes {
  SET_GRUPOS: string;
}

export interface GruposAction {
  type: string;
  payload: GruposState;
}
