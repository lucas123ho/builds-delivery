import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { uniqBy } from "lodash";
import { Alert } from "react-native";

import {
  Title,
  ItemSale,
  TitleItemSale,
  PriceItemSale,
  QuantityItemSale,
  TextTitle,
  AddMoreItems,
  ContentAddMoreItems,
  ContainerTitle,
  ContainerAmount,
  ContainerContentAmout,
  TextContentAmout,
  Head,
  ObservacaoPgamento,
  ContainerObservacao,
  Observacao,
  ContentItemSale,
  ContainerSelect,
  ContainerBall,
  Ball,
  TextSelect,
} from "./styles";
import Layout from "@components/Layout";
import TitlePage from "@components/TitlePage";
import Select from "@components/Select";
import { Padding, Divisor } from "@styles/components";
import { ApplicationState } from "@store/index";
import { formatMoney, cut, capitalize } from "@root/utils/functions";
import colors from "@root/styles/colors";
import InputObservacao from "@components/InputObservacao";
import {
  setFreteAction,
  setValueAction,
  routeAction,
  saleAction,
} from "@root/utils/dispatch";
import Input from "@components/Input";
import api from "@services/api";
import Modal from "@components/Modal";

export default function Finalizar() {
  const {
    formatted_address: logradouro,
    complemento,
    numero,
    items,
    total,
    total_com_frete,
    forma_pagamento,
    troco,
    value: valueRedux,
    cep,
    frete: freteSale,
    vlTrocoMax,
    vlTotalMin,
    latitude,
    longitude,
    retiradaLocal,
  } = useSelector((state: ApplicationState) => ({
    ...state.user,
    ...state.sale,
    ...state.config,
  }));
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [value, setValue] = useState(String(valueRedux));
  const [modalPagamentoVisible, setModalPagamentoVisible] = useState(false);
  const [frete, setFrete] = useState(retiradaLocal ? 0 : freteSale);
  const [pegarNoLocal, setPegarNoLocal] = useState(retiradaLocal);

  function handleNavigateToProduct(item) {
    item = {
      title: item?.name,
      ...item,
    };
    navigation.navigate("Produto", { ...item });
  }

  useEffect(() => {
    if (JSON.stringify(items) === "[]") {
      navigation.navigate("Inicio");
    }
    console.log("Fora: ", retiradaLocal);
    async function getFrete() {
      if (!retiradaLocal) {
        console.log("Dentro: ", pegarNoLocal)
        const { data: address } = await api.get(
          `/frete/${cep}?latitude=${latitude}&longitude=${longitude}`
        );
        setFrete(address.vlFrete);
        dispatch(
          setFreteAction({
            frete: address.vlFrete,
          })
        );
      } else {
        setFrete(0);
        dispatch(
          setFreteAction({
            frete: 0,
          })
        );
      }
    }
    getFrete();
  }, []);

  useEffect(() => {
    dispatch(
      setValueAction({
        value: Number(value),
      })
    );
  }, [value]);

  useEffect(() => {
    async function setarFrete() {
      if (pegarNoLocal) {
        dispatch(
          setFreteAction({
            frete: 0,
          })
        );
        setFrete(0);
      } else {
        const { data: address } = await api.get(
          `/frete/${cep}?latitude=${latitude}&longitude=${longitude}`
        );
        dispatch(
          setFreteAction({
            frete: address.vlFrete,
          })
        );
        setFrete(address.vlFrete);
      }
    }
    setarFrete();
  }, [pegarNoLocal]);

  async function handleFinalizePedido() {
    const { data: result } = await api.post("/produtos/verificar", {
      itens: items?.map((item) => ({
        product_id: item?.product_id,
        quantity: item?.quantity,
      })),
    });
    if (result.error === false) {
      if (forma_pagamento.nmPagamento) {
        if (total_com_frete >= vlTotalMin) {
          if (
            forma_pagamento?.nmPagamento?.toLocaleLowerCase() === "dinheiro"
          ) {
            if (troco <= vlTrocoMax) {
              if (Number(value) >= total_com_frete) {
                dispatch(
                  routeAction({
                    enviando_pedido: true,
                  })
                );
              } else {
                Alert.alert(
                  "Valor em dinheiro menor que o total a pagar",
                  `O total a pagar é ${formatMoney(
                    total_com_frete
                  )}, o valor em dinheiro informado foi ${formatMoney(
                    Number(value)
                  )}`,
                  [
                    {
                      text: "Voltar",
                    },
                  ]
                );
              }
            } else {
              Alert.alert(
                "Valor máximo para troco excedido",
                `O valor máximo para troco é de ${formatMoney(vlTrocoMax)}.`,
                [
                  {
                    text: "Voltar",
                  },
                ]
              );
            }
          } else {
            dispatch(
              routeAction({
                enviando_pedido: true,
              })
            );
          }
        } else {
          Alert.alert(
            "Valor mínimo não atingido",
            `O valor mínimo para entrega é de ${formatMoney(vlTotalMin)}.`,
            [
              {
                text: "Voltar",
              },
            ]
          );
        }
      } else {
        setModalPagamentoVisible(true);
      }
    } else {
      Alert.alert("O estoque foi atualizado", `Teste`, [
        {
          text: "Voltar",
        },
      ]);
    }
  }

  function handleSetObservacaoPedido(text: string) {
    dispatch(
      saleAction({
        observacao: text,
      })
    );
  }

  async function handleSelectRetirarLocal() {
    dispatch(
      saleAction({
        retiradaLocal: !retiradaLocal,
      })
    );
    console.log(!retiradaLocal);
    setPegarNoLocal(!pegarNoLocal);
  }

  return (
    <>
      <Layout
        address={false}
        center={false}
        textButtonBottom="Finalizar pedido"
        contentContainerStyle={{ paddingBottom: 100 }}
        totalButtonBottom={total_com_frete}
        onPressButtonBottom={handleFinalizePedido}
      >
        <Padding>
          <TitlePage title="Finalizar pedido" />
          <Head>Informações de endereço:</Head>
          <Select
            style={{ marginBottom: 0 }}
            title={cut(logradouro, 30, "...")}
            subTitle={
              `Número: ${numero}` + (complemento ? ` - ${complemento}` : "")
            }
            button={{
              onPress: () =>
                navigation.navigate("PageEndereco", { to: "Finalizar" }),
              style: { opacity: pegarNoLocal ? 0.2 : 1 },
              disabled: pegarNoLocal,
            }}
          />
          <ContainerSelect onPress={() => handleSelectRetirarLocal()}>
            <ContainerBall>{pegarNoLocal && <Ball />}</ContainerBall>
            <TextSelect>Retirar no local</TextSelect>
          </ContainerSelect>
          <Divisor />
          <Head style={{ marginTop: 0 }}>Pedido:</Head>
          <ContainerTitle>
            <Title>Itens selecionados</Title>
            <AddMoreItems>
              <ContentAddMoreItems
                onPress={() => navigation.navigate("Inicio")}
              >
                + Adicionar mais itens
              </ContentAddMoreItems>
            </AddMoreItems>
          </ContainerTitle>
          {items.map((item) => (
            <ItemSale
              key={`${item.name}${Math.random() * 10}`}
              onPress={() => handleNavigateToProduct(item)}
            >
              <ContentItemSale>
                <TitleItemSale>
                  <QuantityItemSale>{item.quantity} X</QuantityItemSale>
                  <TextTitle>{capitalize(item.name)}</TextTitle>
                </TitleItemSale>
                <PriceItemSale>{formatMoney(item?.total)}</PriceItemSale>
              </ContentItemSale>
              {(!!item?.observacao || item?.opcoesSelecionadas?.length > 0) && (
                <ContainerObservacao>
                  {item?.opcoesSelecionadas?.length > 0 &&
                    uniqBy(item?.opcoesSelecionadas, "item_id")?.map(
                      (opcao) => (
                        <Observacao key={String(opcao?.id)}>
                          +{" "}
                          {
                            item?.opcoesSelecionadas?.filter(
                              (op) => op?.item_id === opcao?.item_id
                            ).length
                          }{" "}
                          x {opcao?.nome}{" "}
                          {!!opcao?.valor_adicional
                            ? `- ${formatMoney(opcao?.valor_adicional)}`
                            : ""}
                        </Observacao>
                      )
                    )}
                  <Observacao
                    style={{ marginTop: item?.opcoes?.length > 0 ? 16 : 0 }}
                  >
                    {item?.observacao}
                  </Observacao>
                </ContainerObservacao>
              )}
            </ItemSale>
          ))}
          <ContainerAmount>
            <ContainerContentAmout>
              <TextContentAmout style={{ flex: 1 }}>Subtotal:</TextContentAmout>
              <TextContentAmout style={{ color: colors.green }}>
                + {formatMoney(total)}
              </TextContentAmout>
            </ContainerContentAmout>
            <ContainerContentAmout>
              <TextContentAmout style={{ flex: 1 }}>Entrega:</TextContentAmout>
              <TextContentAmout style={{ color: colors.green }}>
                + {formatMoney(frete)}
              </TextContentAmout>
            </ContainerContentAmout>
            <ContainerContentAmout style={{ marginBottom: 0, marginTop: 12 }}>
              <TextContentAmout bold={true} style={{ flex: 1 }}>
                Total:
              </TextContentAmout>
              <TextContentAmout bold={true} style={{ color: colors.green }}>
                + {formatMoney(total_com_frete || 0)}
              </TextContentAmout>
            </ContainerContentAmout>
          </ContainerAmount>
          <Divisor />
          <Head style={{ marginTop: 0 }}>Forma de pagamento:</Head>
          <Select
            style={{
              marginTop: 0,
              marginBottom: 0,
            }}
            title={forma_pagamento?.nmPagamento}
            button={{
              onPress: () => navigation.navigate("FormasPagamento"),
            }}
          />
          {forma_pagamento?.Pag_Obs?.length !== 0 && (
            <ObservacaoPgamento>{forma_pagamento?.Pag_Obs}</ObservacaoPgamento>
          )}
          {forma_pagamento?.nmPagamento?.toLocaleLowerCase() === "dinheiro" && (
            <>
              <Input
                style={{
                  marginTop: 20,
                }}
                label="Qual o valor em dinheiro?"
                keyboardType="numeric"
                onChangeText={setValue}
                value={value}
              />
              <ContainerContentAmout>
                <TextContentAmout bold={true} style={{ flex: 1 }}>
                  Troco:
                </TextContentAmout>
                <TextContentAmout
                  style={{ color: troco < 0 ? colors.red : colors.green }}
                >
                  {formatMoney(troco)}
                </TextContentAmout>
              </ContainerContentAmout>
            </>
          )}
          <Divisor />
          <InputObservacao
            label="Observação do pedido:"
            placeholder="Ex.: Trazer a carne separada dos ovos"
            onChangeText={handleSetObservacaoPedido}
          />
        </Padding>
      </Layout>
      <Modal
        visible={modalPagamentoVisible}
        title="Selecione a forma de pagamento"
        subTitle="Você precisa selecionar uma forma de pagamento para finalizar o pedido"
        onClose={() => {
          setModalPagamentoVisible(false);
          navigation.navigate("FormasPagamento");
        }}
        image={{
          uri:
            "data:image/png;base64,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",
        }}
        textButton="Selecionar"
      />
    </>
  );
}
