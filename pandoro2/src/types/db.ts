export interface Grupo {
  Store_id: number;
  Id: number;
  nmGrupo: string;
  url_imagem: string;
  AtivoApp: boolean;
}

export interface SubGrupo {
  Store_Id: number;
  Id: number;
  Grupo_Id: number;
  nmSubGrupo: string;
}

export interface Promocao {
  Promocao_Id: number;
  Id: number;
  Produto_Id: number;
  vlPromocao: number;
  Store_Id: number;
}

export interface ItemOpcao {
  Opcao_Id: number;
  Id: number;
  nmDescricao: string;
  vlAdicional: number;
  Esgotado: boolean;
  quantidadeMax: number;
}

export interface Opcao {
  Store_Id: number;
  Produto_Id: number;
  Id: number;
  nmDescricao: string;
  obrigatorio: boolean;
  escolhaMax: number;
  escolhaMin: number;
  itens: ItemOpcao[];
}

export interface Produto {
  Store_Id: number;
  Id: number;
  nmProduto: string;
  vlPreco: number;
  vlPromocao: number;
  qtdEstoque: number;
  Observacao: string;
  isComposto: boolean;
  url_imagem: string;
  Grupo_Id: number;
  SubGrupo_Id: number;
  promocao: Promocao;
  opcoes: Opcao[];
}

export interface GrupoWithProdutos extends Grupo {
  produtos: Produto[];
  __meta__: {
    produtos_count: number;
  };
}

export interface SubGrupoWithProdutos extends SubGrupo {
  produtos: Produto[];
  total: number;
  __meta__: {
    produtos_count: number;
  }
}

export interface GrupoWithSubGruposWithProdutos extends Grupo {
  produtos: Produto[];
  subGrupos: SubGrupoWithProdutos[];
}

export interface GrupoWithSubGrupos extends Grupo {
  subGrupos: SubGrupoWithProdutos[];
}

export interface ResultSearch {
  grupos: Grupo[];
  produtos: Produto[];
}

export interface FormaPagamento {
  Id?: number;
  nmPagamento?: string;
  Pag_Obs?: string;
  Store_Id?: number;
}

export interface Item {
  Id: number;
  Produto_Id: Number;
  PedidoVenda_Id: number;
  qtdItem: number;
  vlPreco: number;
  Item_Obs: string;
  Opcao_Obs: string;
  Store_Id: number;
  produto: Produto;
}

export interface Cliente {
  Id: number;
  nrCnpj: string;
  nmLogradouro: string;
  nmBairro: string;
  nrNumero: string;
  dsComplemento: string;
  nmCidade: string;
  nmEstado: string;
  nrCEP: string;
  Store_Id: number;
  nmCliente: string;
  Latitude: number;
  Longitude: number;
}

export interface Pedido {
  Id: number;
  dtVenda: string;
  FormaPagamento_Id: number;
  ClienteEntrega_Id: number;
  PagDinheiro: number;
  StatusVenda: number;
  Store_Id: number;
  vlTotal: number;
  dsObservacao: number;
  formaPagamento: {
    Id: number;
    nmPagamento: string;
    Pag_Obs: string;
    Store_Id: number;
  };
  itens?: Item[];
  cliente?: Cliente;
}

export interface PedidosCliente {
  pedidos: Pedido[];
  pedidos_abertos: Pedido[];
}
