import { Platform } from "react-native";
import geolocation from "geolocation-google-maps";

import api from "../services/api";
import {
  Grupo,
  GrupoWithProdutos,
  GrupoWithSubGruposWithProdutos,
  Produto,
  ResultSearch,
  GrupoWithSubGrupos,
  SubGrupoWithProdutos,
  FormaPagamento,
  PedidosCliente,
} from "../types/db";

export function plataform({ ios, android }): any {
  return Platform.OS === "ios" ? ios : android;
}

export function formataCPF(cpf: string = ""): string {
  if (cpf) {
    cpf = cpf.replace(/[^\d]/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else {
    return "";
  }
}

export function formatTel(telefone: string = ""): string {
  if (telefone) {
    telefone = telefone.replace(/[^\d]/g, "");
    telefone = telefone.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    telefone = telefone.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
    return telefone;
  } else {
    return "";
  }
}

export function formatMoney(value: number = 0) {
  var numero = value.toFixed(2).split(".");
  numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join(".");
  return numero.join(",");
}

export function cut(value: string, length: number = 30, end: string = "") {
  return value.length > length
    ? value.slice(0, length) + end
    : value.slice(0, length);
}

export async function getCEP(latitude: number, longitude: number) {
  let postalCode = "";
  const address = `${latitude},${longitude}`;
  const results = await geolocation({
    key: "AIzaSyBkefhu96zvXtmvrcKgX3CniesdDDe3H28",
    address,
  });
  results.forEach((item) => {
    item.address_components.forEach((component) => {
      if (!postalCode) {
        const isPostalCode = component.types.indexOf("postal_code") !== -1;
        if (isPostalCode) {
          const isCompletPostalCode = component.long_name.indexOf("-") !== -1;
          if (isCompletPostalCode) {
            postalCode = component.long_name;
          }
        }
      } else {
        return;
      }
    });
  });
  return postalCode.replace("-", "");
}

export async function getNumber(latitude: number, longitude: number) {
  let number = "";
  const address = `${latitude},${longitude}`;
  const results = await geolocation({
    key: "AIzaSyBkefhu96zvXtmvrcKgX3CniesdDDe3H28",
    address,
  });
  results.forEach((item) => {
    item.address_components.forEach((component) => {
      if (!number) {
        const isNumber = component.types.indexOf("street_number") !== -1;
        if (isNumber) {
          number = component.long_name;
        }
      } else {
        return;
      }
    });
  });
  return number;
}

interface ReturnCobertura {
  data: {
    message: string;
    cobertura: boolean;
  };
}

export async function verifyCoverByCEP(
  cep: string,
  latitude: number = null,
  longitude: number = null
) {
  const { data: response }: ReturnCobertura = await api.get(
    `/cobertura/${cep}?latitude=${latitude}&longitude=${longitude}`
  );
  return response;
}

export async function getGrupos(): Promise<GrupoWithSubGrupos[]> {
  const { data: grupos } = await api.get("/grupos");
  return grupos;
}

export async function getOneGrupo(
  grupo_id: number,
  search: string = ""
): Promise<GrupoWithSubGruposWithProdutos> {
  const { data: grupo } = await api.get(`/grupos/${grupo_id}?q=${search}`);

  return grupo;
}

export async function getGruposWithProdutos(): Promise<GrupoWithProdutos[]> {
  const { data: grupos } = await api.get(`/grupos/produtos`);
  return grupos;
}

export async function getCombos(): Promise<Produto[]> {
  const { data: combos } = await api.get("/combos");
  return combos;
}

export async function getProdutos(
  page: number = 1,
  limit: number = 10
): Promise<Produto[]> {
  const { data: produtos } = await api.get(
    `/produtos?page=${page}&limit=${limit}`
  );
  return produtos;
}

export async function getSubGrupo(
  subGrupo_id: number,
  grupo_id: number,
  page: number = 1,
  q: string = ""
): Promise<SubGrupoWithProdutos> {
  const { data: subGrupo } = await api.get(
    `/subgrupos/${subGrupo_id}?page=${page}&q=${q}&grupo_id=${grupo_id}`
  );
  return subGrupo;
}

export async function search(q: string): Promise<ResultSearch> {
  const { data } = await api.get(`/search?q=${q}`);
  return data;
}

export function compareWords(word: string, search: string) {
  const searchFormated = search
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(" ", "")
    .toLocaleLowerCase();
  const wordFormated = word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(" ", "")
    .toLocaleLowerCase();
  return wordFormated.indexOf(searchFormated) !== -1;
}

export function capitalize(value: string, lower: boolean = true): string {
  return (lower ? value.toLowerCase() : value).replace(
    /(?:^|\s|["'([{])+\S/g,
    (match) => match.toUpperCase()
  );
}

export async function getFormasPagamento(): Promise<FormaPagamento[]> {
  const { data } = await api.get("/formaspagamento");
  return data;
}

export async function getPedidos(
  array_users_ids: number[]
): Promise<PedidosCliente> {
  const users = array_users_ids.join("|");
  const { data: pedidos } = await api.get(`/vendas/clientes?q=${users}`);
  return pedidos;
}

export function returnPrice(produto: Produto): number {
  if (produto?.promocao) {
    return produto?.promocao?.vlPromocao;
  } else {
    if (produto?.vlPromocao < produto?.vlPreco) {
      return produto?.vlPromocao;
    } else {
      return produto?.vlPreco;
    }
  }
}
