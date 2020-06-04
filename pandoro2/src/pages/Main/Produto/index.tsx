import React, { useState, useEffect } from "react";
import { Alert, View, SafeAreaView } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { CheckBox } from "react-native-elements";

import {
  Avatar,
  Image,
  Title,
  Description,
  Price,
  Container,
  Add,
  Footer,
  ContainerIconLeft,
  ContainerIconRight,
  Quantity,
  ButtonAdd,
  TextButtonAdd,
  ContainerPrice,
  ContainerOpcao,
  Tag,
  TextTag,
  OpcaoText,
  ContainerAddOpcao,
  ButtonAddOpcao,
  TextButtonAddOpcao,
  TextQuantidadeOpcao,
  InfoOpcao,
} from "./styles";
import TitlePage from "@components/TitlePage";
import { Content, Padding } from "@styles/components";
import colors from "@styles/colors";
import { Divisor } from "@styles/components";
import InputObservacao from "@components/InputObservacao";
import fonts from "@root/styles/fonts";
import { formatMoney, capitalize } from "@utils/functions";
import { addItemAction, removeItemAction } from "@root/utils/dispatch";
import { ApplicationState } from "@store/index";
import api from "@root/services/api";

interface OpcaoSelecionada {
  opcao_id: number;
  item_id: number;
  id: number;
  valor_adicional: number;
  nome: string;
  opcao: string;
}

export default function Produtos({ route }) {
  const { items, volumeTotal } = useSelector((state: ApplicationState) => ({ ...state.sale }));
  const config = useSelector((state: ApplicationState) => state.config);
  const { params } = route;
  const name = params?.name;
  const [price, setPrice] = useState(
    params?.total ? params?.total / params?.quantity : params?.price
  );
  const image = params?.image;
  const product_id = params?.product_id;
  const id = params?.id;
  const description = params?.description;
  const normal_price = params?.normal_price;
  const [quantity, setQuantity] = useState(1);
  const [baseQuantity, setBaseQuantity] = useState(0);
  const [total, setTotal] = useState(price);
  const [observacao, setObservacao] = useState("");
  const [selected, setSelected] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [opcoes, setOpcoes] = useState(params?.opcoes);
  const [itensSelecionados, setItensSelecionados] = useState<
    OpcaoSelecionada[]
  >(params?.opcoesSelecionadas || []);
  const [estoque, setEstoque] = useState();

  useEffect(() => {
    async function getProduto() {
      const { data: produto } = await api.get(`/produtos/${product_id}`);
      console.log(produto);
    }
    const [item] = items.filter((item) => item?.id === id);
    if (item) {
      setQuantity(item.quantity);
      setBaseQuantity(item.quantity);
      setObservacao(item?.observacao);
      setSelected(true);
    }
    getProduto();
  }, []);

  function handleChangeQuantity(value: string) {
    setQuantity(Number(value));
  }

  function handleToggleQuantity(flag: "plus" | "minus") {
    setQuantity(
      flag === "plus" ? quantity + 1 : quantity - 1 >= 1 ? quantity - 1 : 1
    );
  }

  function handleAddOpcao(itemId: number, opcaoId: number) {
    const [opcao] = opcoes.filter((opcao) => opcao.Id === opcaoId);
    const [item] = opcao.itens.filter((item) => item.Id === itemId);

    const opcoesSelected = itensSelecionados?.filter(
      (item) => item?.opcao_id === opcaoId
    );
    const itensSelected = itensSelecionados?.filter(
      (item) => item?.item_id === itemId
    );

    if (
      opcoesSelected.length < opcao.escolhaMax &&
      itensSelected.length < item.quantidadeMax
    ) {
      const itens = itensSelecionados?.filter(
        (i) => i.item_id === itemId && i.opcao_id === opcaoId
      );
      setPrice(price + item.vlAdicional);
      setItensSelecionados([
        ...itensSelecionados,
        {
          opcao_id: opcaoId,
          item_id: itemId,
          id: itensSelecionados.length + Math.random(),
          valor_adicional: item.vlAdicional,
          nome: item.nmDescricao,
          opcao: opcao?.nmDescricao,
        },
      ]);
    } else {
      if (
        opcoesSelected.length >= opcao.escolhaMax &&
        itensSelected.length < item.quantidadeMax
      ) {
        const itens = itensSelecionados.filter((i) => i.opcao_id === opcaoId);
        const it = itens[0];
        setPrice(price - it.valor_adicional + item.vlAdicional);
        setItensSelecionados([
          ...itensSelecionados.filter((i) => i.id !== it.id),
          {
            opcao_id: opcaoId,
            item_id: itemId,
            id: itensSelecionados.length + Math.random(),
            valor_adicional: item.vlAdicional,
            nome: item.nmDescricao,
            opcao: opcao?.nmDescricao,
          },
        ]);
      }
    }
  }

  function removeOpcaoItem(itemId: number, opcaoId: number) {
    let deleted = 0;
    const [opcao] = opcoes.filter((opcao) => opcao.Id === opcaoId);
    const [item] = opcao.itens.filter((item) => item.Id === itemId);
    const itens = itensSelecionados?.filter(
      (i) => i.item_id === itemId && i.opcao_id === opcaoId
    );
    setPrice(itens.length !== 0 ? price - item.vlAdicional : price);
    setItensSelecionados(
      itensSelecionados.filter((i) => {
        if (deleted === 0 && i.item_id === itemId && i.opcao_id === opcaoId) {
          deleted = 1;
          return false;
        } else {
          return true;
        }
      })
    );
  }

  function toggleOpcaoItem(itemId: number, opcaoId: number) {
    const itemSelected = itensSelecionados.filter(
      (i) => i.item_id === itemId && i.opcao_id === opcaoId
    );
    if (itemSelected.length > 0) {
      removeOpcaoItem(itemId, opcaoId);
    } else {
      handleAddOpcao(itemId, opcaoId);
    }
  }

  function handleAddItem() {
    function validation() {
      let valid = true;
      const opcoesObrigatorias = opcoes.filter(
        (opcao) => opcao.obrigatorio === true
      );
      opcoesObrigatorias.forEach((opcao) => {
        const itensSelected = itensSelecionados.filter(
          (i) => i.opcao_id === opcao.Id
        );
        if (
          itensSelected.length === 0 ||
          itensSelected.length < opcao?.escolhaMin
        ) {
          valid = false;
        }
      });
      return valid;
    }
    if (validation()) {
      if(((volumeTotal - baseQuantity) + quantity) <= config.qtdVolumeMax) {
        dispatch(
          addItemAction({
            item: {
              name,
              price: params?.price,
              product_id,
              quantity,
              total,
              observacao,
              description,
              image,
              id,
              opcoesSelecionadas: itensSelecionados,
              opcoes: params?.opcoes
            },
          })
        );
        navigation.goBack();
      } else {
        Alert.alert(
          "Volume excedido",
          `O número máximo de itens para entrega é ${config?.qtdVolumeMax} itens por viagem. Para selecionar este produto, retire algum item do carrinho.`,
          [
            {
              text: "Voltar",
            },
          ]
        );
      }
    } else {
      Alert.alert(
        "Atenção!",
        `Você precisa selecionar todas as opções obrgatorias`,
        [
          {
            text: "Selecionar",
          },
        ]
      );
    }
  }

  function handleRemoveItem() {
    Alert.alert("Atenção!", `Deseja mesmo remover ${name} do seu carrinho?`, [
      {
        text: "Sim",
        onPress: () => {
          dispatch(
            removeItemAction({
              id: id,
              quantity
            })
          );
          navigation.goBack();
        },
      },
      {
        text: "Não",
      },
    ]);
  }

  useEffect(() => {
    if (quantity === 0) {
      setQuantity(1);
      setTotal(price);
    } else {
      setTotal(price * quantity);
    }
  }, [quantity, price]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <Content
      style={{
        paddingBottom: 0,
      }}
    >
      <TitlePage title="Adicionar item ao carrinho" />
      <Container
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {image ? (
          <Image source={{ uri: image }} resizeMode="cover" />
        ) : (
          <Avatar>
            <Feather name="shopping-cart" size={70} color={colors.lightGray} />
          </Avatar>
        )}
        <Padding>
          <Title>{capitalize(name)}</Title>
          {selected && (
            <Tag onPress={handleRemoveItem}>
              <TextTag>X Remover do carrimho</TextTag>
            </Tag>
          )}
          <Description>{params?.description}</Description>
          <ContainerPrice>
            {!!normal_price && params?.price < normal_price && (
              <>
                <Price
                  style={{
                    color: colors.gray,
                    textDecorationLine: "line-through",
                    textDecorationStyle: "solid",
                  }}
                >
                  {formatMoney(normal_price)}
                </Price>
                <Price style={{ color: colors.gray }}> - </Price>
              </>
            )}
            <Price>{formatMoney(params?.price)}</Price>
          </ContainerPrice>
          <Divisor />
          {opcoes.map((opcao) => (
            <View key={String(opcao.Id)}>
              <Title>{opcao.nmDescricao}</Title>
              <InfoOpcao style={{ marginBottom: 8 }}>
                {opcao.obrigatorio === true ? "Obrigatorio*   |  " : ""} Mínimo:{" "}
                {opcao?.escolhaMin}   |   Maximo: {opcao.escolhaMax}
              </InfoOpcao>
              {opcao?.itens?.map((item) =>
                item?.quantidadeMax <= 1 ? (
                  <ContainerAddOpcao key={String(item.Id)}>
                    <CheckBox
                      checkedColor={colors.green}
                      checkedIcon="check-box"
                      uncheckedIcon="check-box-outline-blank"
                      iconType="material"
                      checked={
                        itensSelecionados.filter(
                          (i) =>
                            i.item_id === item?.Id && i.opcao_id === opcao.Id
                        ).length > 0
                      }
                      onPress={() => {
                        toggleOpcaoItem(item.Id, opcao.Id);
                      }}
                      title={item.nmDescricao}
                      containerStyle={{
                        flex: 1,
                        backgroundColor: colors.white,
                        borderWidth: 0,
                        paddingHorizontal: 0,
                        marginLeft: 0,
                        paddingBottom: 0,
                      }}
                      textStyle={{
                        color: colors.black,
                      }}
                    />
                    {!!item?.vlAdicional && (
                      <InfoOpcao style={{ color: colors.green }}>
                        {item?.vlAdicional !== 0
                          ? `+ ${formatMoney(item?.vlAdicional)}`
                          : ""}
                      </InfoOpcao>
                    )}
                  </ContainerAddOpcao>
                ) : (
                  <ContainerOpcao key={String(item.Id)}>
                    <OpcaoText>{item?.nmDescricao}</OpcaoText>
                    <InfoOpcao style={{ color: colors.green }}>
                      {item?.vlAdicional !== 0
                        ? `+ ${formatMoney(item?.vlAdicional)}`
                        : ""}
                    </InfoOpcao>
                    <ContainerAddOpcao style={{ marginLeft: 10 }}>
                      <ButtonAddOpcao
                        onPress={() => {
                          removeOpcaoItem(item.Id, opcao.Id);
                        }}
                        disabled={
                          itensSelecionados.filter(
                            (i) =>
                              i.item_id === item?.Id && i.opcao_id === opcao?.Id
                          ).length === 0
                        }
                      >
                        <TextButtonAddOpcao>-</TextButtonAddOpcao>
                      </ButtonAddOpcao>
                      <TextQuantidadeOpcao>
                        {
                          itensSelecionados.filter((i) => i.item_id === item.Id)
                            .length
                        }
                      </TextQuantidadeOpcao>
                      <ButtonAddOpcao
                        onPress={() => {
                          handleAddOpcao(item.Id, opcao.Id);
                        }}
                        disabled={
                          itensSelecionados.filter(
                            (i) =>
                              i.item_id === item?.Id && i.opcao_id === opcao?.Id
                          ).length === item?.quantidadeMax ||
                          itensSelecionados.filter(
                            (i) => i.opcao_id === opcao?.Id
                          ).length === opcao?.escolhaMax
                        }
                      >
                        <TextButtonAddOpcao>+</TextButtonAddOpcao>
                      </ButtonAddOpcao>
                    </ContainerAddOpcao>
                  </ContainerOpcao>
                )
              )}

              <Divisor />
            </View>
          ))}
          <InputObservacao onChangeText={setObservacao} value={observacao} />
        </Padding>
      </Container>
      <Footer>
        <Add>
          <ContainerIconLeft onPress={() => handleToggleQuantity("minus")}>
            <Feather name="minus" size={20} color={colors.gray} />
          </ContainerIconLeft>
          <Quantity
            onChangeText={handleChangeQuantity}
            value={String(quantity)}
            keyboardType="numeric"
          />
          <ContainerIconRight onPress={() => handleToggleQuantity("plus")}>
            <Feather name="plus" size={20} color={colors.gray} />
          </ContainerIconRight>
        </Add>
        <ButtonAdd onPress={handleAddItem}>
          <TextButtonAdd
            style={{ fontSize: Number(fonts.sizes.small.replace("px", "")) }}
          >
            {selected ? "Atualizar" : "Adicionar"}
          </TextButtonAdd>
          <TextButtonAdd style={{ textAlign: "right" }}>
            {formatMoney(total)}
          </TextButtonAdd>
        </ButtonAdd>
      </Footer>
    </Content>
    </SafeAreaView>
  );
}
