import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { uniqBy } from "lodash";

import imageCheck from "@assets/images/sending.png";
import PageInfo from "@components/PageInfo";
import { ApplicationState } from "@root/store";
import { Types } from "@root/store/ducks/sale";
import api from "@root/services/api";
import {
  userAction,
  routeAction,
  saleAction,
  setUsersIds,
  setPedidos,
} from "@root/utils/dispatch";
import { getPedidos } from "@root/utils/functions";
import { format } from "date-fns";
import moment from "moment";

export default function EnviarVenda() {
  const { sale, user } = useSelector((state: ApplicationState) => state);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (sale.items.length !== 0) {
      async function sendPedido(pedido) {
        try {
          const { data: pedidoResult } = await api.post("/vendas", pedido);
          const { data: pedidoEnviado } = await api.get(
            `/vendas/${pedidoResult.id}`
          );
          const pedidos = await getPedidos([
            ...user?.users_ids,
            pedidoEnviado.cliente.Id,
          ]);
          dispatch(setPedidos(pedidos));
          dispatch(
            userAction({
              id: pedidoEnviado.cliente.Id,
            })
          );
          dispatch(
            setUsersIds({
              id: pedidoEnviado.cliente.Id,
            })
          );
          dispatch({
            type: Types.DELETE_SALE,
          });
          dispatch(
            routeAction({
              enviando_pedido: false,
              pedido_aberto: true,
            })
          );
          setTimeout(() => {
            navigation.navigate("Acompanhamento", { id: pedidoResult.id });
          }, 500);
        } catch (e) {
          dispatch(
            routeAction({
              enviando_pedido: false,
            })
          );
        }
      }
      let toSend = {
        formaPagamento: sale?.forma_pagamento,
        dtVenda: moment().format("YYYY-MM-DD kk:mm:ss"),
        cliente: {
          nrCEP: user?.cep,
          nmCliente: user?.nome,
          dsComplemento: user?.complemento,
          nrNumero: user?.numero,
          nrCnpj: user?.cpf,
          Id: user?.id,
          nrTelefone: user?.telefone,
          formated_address: user.formatted_address,
          latitude: user?.latitude,
          longitude: user?.longitude
        },
        itens: [],
        PagDinheiro: sale?.value,
        vlTotal: sale?.total_com_frete,
        dsObservacao: sale?.observacao,
        retiradaLocal: sale?.retiradaLocal,
        vlFrete: sale?.frete,
        qtdItem: sale?.items?.length
      };
      toSend.itens = sale?.items?.map((item) => {
        const opcoes = [];
        const opcoesSelecionadas = uniqBy(item?.opcoesSelecionadas, "opcao").map(
          (item) => item.opcao
        );
        opcoesSelecionadas.forEach((opcao) => {
          const itens = uniqBy(
            item?.opcoesSelecionadas?.filter((item) => item?.opcao === opcao),
            "item_id"
          );
          const itensFormated = itens.map((i) => ({
            ...i,
            quantidade:
              item?.opcoesSelecionadas?.filter((it) => it?.item_id === i?.item_id).length *
              item?.quantity,
          }));

          opcoes.push({
            nome: opcao,
            itens: itensFormated,
          });
        });

        let opcoesToSend = "";
        opcoes.forEach((opcao, index) => {
          if (index === 0) {
            opcoesToSend += `${opcao.nome}:`;
          } else {
            opcoesToSend += `|${opcao.nome}:`;
          }
          opcao?.itens?.forEach((item, index) => {
            if (index === 0) {
              opcoesToSend += `${item.nome}=${item.quantidade}`;
            } else {
              opcoesToSend += `;${item.nome}=${item.quantidade}`;
            }
          });
        });

        return {
          Produto_Id: item?.product_id,
          qtdItem: item?.quantity,
          vlPreco: item?.total/item?.quantity,
          vlSubTotal: item?.total,
          Item_Obs: item?.observacao,
          Opcao_Obs: opcoesToSend,
        };
      });
      sendPedido(toSend);
      // console.log(toSend);
      // dispatch(
      //   routeAction({
      //     enviando_pedido: false,
      //     pedido_aberto: true,
      //   })
      // );
    } else {
      navigation.navigate("Finalizar");
    }
  }, []);

  return (
    <PageInfo
      image={{
        width: 100,
        height: 100,
        source: imageCheck,
      }}
      animationTime={1000}
      title="Enviando Pedido..."
      text="Pode ficar tranquilo, só vai levar alguns segundos."
    />
  );
}
