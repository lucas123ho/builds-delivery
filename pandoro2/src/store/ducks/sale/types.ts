import { FormaPagamento } from "@root/types/db";

interface OpcaoSelecionada {
  opcao_id: number;
  item_id: number;
  id: number;
  valor_adicional: number;
  nome: string;
  opcao: string;
}

interface ItemOpcao {
  Esgotado: boolean;
  Id: number;
  Opcao_Id: number;
  nmDescricao: string;
  quantidadeMax: number;
  vlAdicional: number;
}

interface Opcao {
  Id: number;
  Produto_Id: number;
  Store_Id: number;
  escolhaMax: number;
  escolhaMin: number;
  nmDescricao: string;
  obrigatorio: boolean;
  itens: ItemOpcao[];
}

interface Item {
  id?: number;
  product_id: number;
  name: string;
  quantity: number;
  price: number;
  total: number;
  observacao?: string;
  image?: string;
  description?: string;
  opcoesSelecionadas?: OpcaoSelecionada[];
  opcoes?: Opcao[];
}

export interface SaleState {
  items?: Item[];
  frete?: number;
  total?: number;
  total_com_frete?: number;
  value?: number;
  troco?: number;
  forma_pagamento?: FormaPagamento;
  // itens_selecionados?: number[];
  status?: number;
  id?: number;
  observacao?: string;
  volumeTotal?: number;
}

export interface SaleTypes {
  ADD_ITEM: string;
  REMOVE_ITEM: string;
  DELETE_SALE: string;
  SET_FRETE: string;
  SET_FORMA_PAGAMENTO: string;
  SET_VALUE: string;
  SET_SALE: string;
}

export interface SalePayload {
  item?: Item;
  product_id?: number;
  frete?: number;
  forma_pagamento?: FormaPagamento;
  value?: number;
  id?: number;
  quantity?: number;
}

export interface SaleAction {
  type: string;
  payload: SalePayload;
}
