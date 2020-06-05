import React, { useState, useEffect } from "react";
import { Animated, Dimensions, Alert, ActivityIndicator, Platform, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Title,
  Info,
  ContainerStatus,
  Status,
  BallStatus,
  TextStatus,
  Line,
  ButtonCancel,
  Cancel,
  Content,
  TitleDetalhes,
  ItemSale,
  ContentItemSale,
  TitleItemSale,
  QuantityItemSale,
  TextTitle,
  PriceItemSale,
  ContainerObservacao,
  Observacao,
  ContainerContentAmout,
  TextContentAmout,
  ContainerAmount,
  ContainerLoading,
} from "./styles";
import { Divisor } from "@root/styles/components";
import colors from "@root/styles/colors";
import TitlePage from "@root/components/TitlePage";
import api from "@root/services/api";
import { Pedido } from "@root/types/db";
import { capitalize, formatMoney, cut } from "@root/utils/functions";

export default function Acompanhamento({ route }) {
  const { id } = route.params;
  const [width] = useState(new Animated.Value(0));
  const [title, setTitle] = useState("Pedido Enviado");
  const [info, setInfo] = useState("Em instantes confirmaremos seu pedido");
  const [pedido, setPedido] = useState<Pedido>();
  const [status, setStatus] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    function animation() {
      Animated.timing(width, {
        toValue: Dimensions.get("screen").width,
        delay: 0,
        duration: 1000,
      }).start((result) => {
        if (result.finished) {
          Animated.timing(width, {
            toValue: 0,
            delay: 200,
            duration: 500,
          }).start((result) => {
            if (result.finished) {
              animation();
            }
          });
        }
      });
    }
    async function getPedido() {
      const { data } = await api.get(`/vendas/${id}`);
      setPedido(data);
      setStatus(data.StatusVenda);
      setLoading(false);
    }
    animation();
    getPedido();
    const interval = setInterval(() => {
      getPedido();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    switch (status) {
      case 0:
        setTitle("Pedido Realizado");
        setInfo("Em instantes confirmaremos seu pedido");
        break;
      case 1:
        setTitle("Pedido Confirmado");
        setInfo("Seu pedido foi confirmado");
        break;
      case 2:
        setTitle("Preparando pedido");
        setInfo(
          "Seu pedido está sendo preparado e em breve sairá para entrega"
        );
        break;
      case 3:
        setTitle("Pedido saiu para entrega!");
        setInfo("Seu pedido chegará em breve no local escolhido");
        break;
      case 4:
        setTitle("Pedeido entregue!");
        setInfo("Seu pedido foi entregue");
        break;
      case 5:
        setTitle("Pedido Cancelado :(");
        setInfo("Por algum motivo, seu pedido foi cancelado");
        break;
    }
  }, [status]);

  async function handleCancelPedido() {
    Alert.alert("Atenção!!", "Deseja mesmo cancelar este pedido?", [
      {
        text: "Sim",
        onPress: async () => {
          setLoadingCancel(true);
          await api.put(`/vendas/${id}/cancel`);
          const { data } = await api.get(`/vendas/${id}`);
          setPedido(data);
          setStatus(data.StatusVenda);
          setLoadingCancel(false);
          setTimeout(() => {
            navigation.navigate("Pedidos");
          }, 500);
        },
      },
      {
        text: "Não",
      },
    ]);
  }

  return (
    <>
      {loading ? (
        <ContainerLoading>
          <ActivityIndicator size={30} color={colors.blue} />
        </ContainerLoading>
      ) : (
        <>
          <Container style={{ padding: 30 }}>
            <View style={{ paddingHorizontal: Platform.OS === "ios" ? 16 : 0, paddingTop: Platform.OS === "ios" ? 30 : 0 }}>
              <TitlePage title={"Acompanhar pedido #" + id} />
              <Title style={{ marginTop: 16 }}>{title}</Title>
              <Info>{info}</Info>
              <Divisor style={{ marginBottom: 0, marginTop: 10 }} />
            </View>
            <Content
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingTop: 36, paddingBottom: 36, padding: Platform.OS === "ios" ? 16 : 0 }}
            >
              {status !== 5 && (
                <>
                  <ContainerStatus>
                    <Line />
                    <Status>
                      <BallStatus active={status >= 0 && status !== 5} />
                      <TextStatus active={status >= 0 && status !== 5}>
                        Pedido Realizado
                      </TextStatus>
                    </Status>
                    <Status>
                      <BallStatus active={status >= 1 && status !== 5} />
                      <TextStatus active={status >= 1 && status !== 5}>
                        Confirmado
                      </TextStatus>
                    </Status>
                    <Status>
                      <BallStatus active={status >= 2 && status !== 5} />
                      <TextStatus active={status >= 2 && status !== 5}>
                        Preparando pedido
                      </TextStatus>
                    </Status>
                    <Status>
                      <BallStatus active={status >= 3 && status !== 5} />
                      <TextStatus active={status >= 3 && status !== 5}>
                        Saiu para entrega
                      </TextStatus>
                    </Status>
                    <Status style={{ marginBottom: 0 }}>
                      <BallStatus active={status >= 4 && status !== 5} />
                      <TextStatus active={status >= 4 && status !== 5}>
                        Entregue
                      </TextStatus>
                    </Status>
                  </ContainerStatus>
                  <Divisor />
                </>
              )}

              <ContainerStatus>
                <Status>
                  <BallStatus
                    active={status === 5}
                    style={{
                      backgroundColor:
                        status === 5 ? colors.red : colors.lightGray,
                    }}
                  />
                  <TextStatus active={status === 5}>
                    Pedido cancelado
                  </TextStatus>
                </Status>
              </ContainerStatus>
              {status === 0 && (
                <ButtonCancel onPress={handleCancelPedido}>
                  {loadingCancel ? (
                    <ActivityIndicator size={30} color={colors.red} />
                  ) : (
                    <Cancel>Cancelar pedido</Cancel>
                  )}
                </ButtonCancel>
              )}
              <Divisor style={{ marginTop: 0 }} />
              <TitleDetalhes>Detalhes do pedido</TitleDetalhes>
              {/* interface OpcaoSelecionada {
  opcao_id: number;
  item_id: number;
  id: number;
  valor_adicional: number;
  nome: string;
  opcao: string;
} */}
              {pedido?.itens?.map((item) => {
                let opcoesSelecionadas = [];
                if (!!item?.Opcao_Obs) {
                  const opcoes = item?.Opcao_Obs?.split("|");
                  opcoes.forEach((opcao) => {
                    const itens = opcao.split(":")[1].split(";");
                    itens.forEach((item) => {
                      const objItem = item?.split("=");
                      opcoesSelecionadas.push({
                        nome: objItem[0],
                        quantidade: objItem[1],
                      });
                    });
                  });
                }
                return (
                  <ItemSale
                    key={`${item?.produto?.nmProduto}${Math.random() * 10}`}
                    onPress={() => {}}
                  >
                    <ContentItemSale>
                      <TitleItemSale>
                        <QuantityItemSale>{item?.qtdItem} X</QuantityItemSale>
                        <TextTitle>
                          {capitalize(item?.produto?.nmProduto)}
                        </TextTitle>
                      </TitleItemSale>
                      <PriceItemSale>
                        {formatMoney(item?.vlSubTotal)}
                      </PriceItemSale>
                    </ContentItemSale>
                    {(!!item?.Item_Obs || opcoesSelecionadas?.length > 0) && (
                      <ContainerObservacao>
                        {opcoesSelecionadas.map((item) => (
                          <Observacao
                            key={`${item?.nome}.${Math.random()}`}
                          >{`${item?.quantidade} x ${item?.nome}`}</Observacao>
                        ))}
                        <Observacao
                          style={{
                            marginTop: !!item?.Opcao_Obs ? 16 : 0,
                          }}
                        >
                          {item?.Item_Obs}
                        </Observacao>
                      </ContainerObservacao>
                    )}
                  </ItemSale>
                );
              })}
              <ContainerAmount>
                <ContainerContentAmout>
                  <TextContentAmout bold={true} style={{ flex: 1 }}>
                    Endereço:
                  </TextContentAmout>
                  <TextContentAmout>
                    {`${cut(pedido?.cliente?.nmLogradouro, 30, "...")}, ${pedido?.cliente?.nrNumero}`}
                  </TextContentAmout>
                </ContainerContentAmout>
                <ContainerContentAmout>
                  <TextContentAmout bold={true} style={{ flex: 1 }}>
                    Forma de pagamento:
                  </TextContentAmout>
                  <TextContentAmout>
                    {pedido?.formaPagamento?.nmPagamento}
                  </TextContentAmout>
                </ContainerContentAmout>
                <ContainerContentAmout
                  style={{ marginBottom: 0, marginTop: 12 }}
                >
                  <TextContentAmout bold={true} style={{ flex: 1 }}>
                    Total com entrega:
                  </TextContentAmout>
                  <TextContentAmout bold={true} style={{ color: colors.green }}>
                    + {formatMoney(pedido?.vlTotal || 0)}
                  </TextContentAmout>
                </ContainerContentAmout>
              </ContainerAmount>
            </Content>
          </Container>
          {status !== 5 && status !== 4 && (
            <Animated.View
              style={{
                height: 6,
                width,
                backgroundColor: colors.green,
              }}
            />
          )}
        </>
      )}
    </>
  );
}
