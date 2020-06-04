import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as Network from "expo-network";
import moment from "moment";
import "moment/locale/pt-br";
import { SafeAreaView } from 'react-native';

import {
  ContainerPedido,
  Container,
  Detalhe,
  TitlePedido,
  FormaPagamento,
  Status,
  Total,
  Title,
} from "./styles";
import { Content, Divisor } from "@root/styles/components";
import TitlePage from "@root/components/TitlePage";
import { ApplicationState } from "@root/store";
import { Pedido } from "@root/types/db";
import colors from "@root/styles/colors";
import { formatMoney, getPedidos } from "@root/utils/functions";
import { setPedidos, routeAction } from "@root/utils/dispatch";

export default function Pedidos() {
  const { pedidos, pedidos_abertos, users_ids, pedido_aberto } = useSelector(
    (state: ApplicationState) => ({
      ...state.pedidos,
      ...state.user,
      ...state.route,
    })
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function title(pedido: Pedido): string {
    const hoje = moment().format("DD/MM/YYYY");
    const dataPedido = moment(new Date(pedido.dtVenda)).format("DD/MM/YYYY");
    const textData = hoje === dataPedido ? "Hoje" : dataPedido;

    return `Pedido #${pedido?.Id} - ${moment(
      pedido.dtVenda.split(".")[0]
    ).format("kk:mm")} (${textData.slice(0, 5)})`;
  }

  function status(pedido: Pedido): { text: string; color: string } {
    switch (pedido?.StatusVenda) {
      case 0:
        return { text: "Aguardando confirmação", color: colors.lightGray };
      case 1:
        return { text: "Pedido recebido", color: colors.yellow };
      case 2:
        return { text: "Preparando pedido", color: colors.yellow };
      case 3:
        return { text: "Saiu para entrega", color: colors.yellow };
      case 4:
        return { text: "Entregue", color: colors.green };
      case 5:
        return { text: "Pedido cancelado", color: colors.red };
    }
  }

  useEffect(() => {
    async function getStatus() {
      const networkStatus = await Network.getNetworkStateAsync();
      // if (pedido_aberto && networkStatus.isConnected) {
        const pedidos = await getPedidos(users_ids);
        dispatch(setPedidos(pedidos));
        if (pedidos.pedidos_abertos.length === 0) {
          dispatch(
            routeAction({
              pedido_aberto: false,
            })
          );
        }
      // }
    }
    const interval = setInterval(async () => {
      const networkStatus = await Network.getNetworkStateAsync();
      if (pedido_aberto && networkStatus.isConnected) {
        getStatus();
      }
    }, 30000);
    const unsubscribe = navigation.addListener("focus", () => {
      getStatus();
    });
    navigation.addListener("blur", () => {
      clearInterval(interval);
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <Content style={{ paddingBottom: 0 }}>
      <TitlePage title="Pedidos" />
      <Container contentContainerStyle={{ paddingBottom: 30 }}>
        {pedidos_abertos.length !== 0 && (
          <>
            <Title>Pedidos em aberto</Title>
            {pedidos_abertos?.map((pedido, index) => {
              const st = status(pedido);
              return (
                <ContainerPedido
                  onPress={() =>
                    navigation.navigate("Acompanhamento", { id: pedido?.Id })
                  }
                  key={String(pedido?.Id)}
                  style={{
                    marginBottom: index === pedidos_abertos.length - 1 ? 0 : 12,
                  }}
                >
                  <Detalhe style={{ backgroundColor: st.color }} />
                  <TitlePedido>{title(pedido)}</TitlePedido>
                  <FormaPagamento>
                    {pedido?.formaPagamento?.nmPagamento}
                  </FormaPagamento>
                  <Total>{formatMoney(pedido?.vlTotal)}</Total>
                  <Status style={{ color: st.color }}>{st.text}</Status>
                </ContainerPedido>
              );
            })}
            <Divisor />
          </>
        )}
        {pedidos.length !== 0 && (
          <>
            <Title style={{ marginTop: 0 }}>Pedidos Finalizados</Title>
            {pedidos?.map((pedido, index) => {
              const st = status(pedido);
              return (
                <ContainerPedido
                  onPress={() =>
                    navigation.navigate("Acompanhamento", { id: pedido?.Id })
                  }
                  key={String(pedido?.Id)}
                  style={{
                    marginBottom: index === pedidos.length - 1 ? 0 : 12,
                  }}
                >
                  <Detalhe style={{ backgroundColor: st.color }} />
                  <TitlePedido>{title(pedido)}</TitlePedido>
                  <FormaPagamento>
                    {pedido?.formaPagamento?.nmPagamento}
                  </FormaPagamento>
                  <Total
                    style={{
                      color:
                        st.color === colors.red
                          ? colors.lightGray
                          : colors.green,
                    }}
                  >
                    {formatMoney(pedido?.vlTotal)}
                  </Total>
                  <Status style={{ color: st.color }}>{st.text}</Status>
                </ContainerPedido>
              );
            })}
          </>
        )}
      </Container>
    </Content>
    </SafeAreaView>
  );
}
