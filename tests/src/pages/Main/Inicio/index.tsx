import React, { useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import * as Network from "expo-network";

import Layout from "@components/Layout";
import Category from "@components/Category";
import Combo from "@components/Combo";
import { Container, Title, Padding, Info } from "./styles";
import ListItems from "@root/components/ListItems";
import { ApplicationState } from "@root/store";
import {
  capitalize,
  returnPrice,
  getGrupos,
  getGruposWithProdutos,
  getCombos,
} from "@root/utils/functions";
import { Produto } from "@root/types/db";
import { setGrupos } from "@root/utils/dispatch";

export default function Inicio() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const { items: grupos, combos, withProdutos } = useSelector(
    (state: ApplicationState) => state.grupos
  );
  const { users_ids } = useSelector((state: ApplicationState) => state.user);

  function handleNavigateToGrupo(grupo_id: number, title: string) {
    navigation.navigate("Grupo", { grupo_id, title });
  }

  function handleNavigateToDetail(item: Produto) {
    navigation.navigate("Produto", {
      product_id: item?.Id,
      name: item?.nmProduto,
      description: item?.Observacao,
      image: item?.url_imagem,
      price: returnPrice(item),
      normal_price: item?.vlPreco,
    });
  }

  function handleFinalize() {
    navigation.navigate("Finalizar");
  }

  async function onRefresh() {
    setRefreshing(true);
    const networkStatus = await Network.getNetworkStateAsync();
    if (networkStatus.isConnected) {
      try {
        const grupos = await getGrupos();
        const gruposWithProdutos = await getGruposWithProdutos();
        const combos = await getCombos();
        dispatch(
          setGrupos({
            items: grupos,
            withProdutos: gruposWithProdutos,
            combos,
          })
        );
        setRefreshing(false);
      } catch (e) {
        setRefreshing(false);
      }
    }
  }

  return (
    <Layout
      onPressButtonBottom={handleFinalize}
      center={false}
      refresh={{ refreshing, onRefresh }}
    >
      {grupos.length !== 0 && (
        <Container>
          <Padding>
            <Title>Categorias</Title>
          </Padding>
          <FlatList
            data={grupos}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item?.nmGrupo + item?.Id}
            renderItem={({ item, index }) => (
              <Category
                onPress={() =>
                  handleNavigateToGrupo(item?.Id, capitalize(item?.nmGrupo))
                }
                style={{
                  marginLeft: index === 0 ? 10 : 0,
                  marginRight: index === grupos?.length - 1 ? 10 : 0,
                }}
                text={capitalize(item?.nmGrupo)}
                image={item?.url_imagem}
              />
            )}
          />
        </Container>
      )}
      {combos?.length !== 0 && (
        <Container style={{ marginBottom: 36 }}>
          <Padding>
            <Title>Combos</Title>
          </Padding>
          <FlatList
            data={combos}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item?.nmProduto + item?.Id}
            renderItem={({ item, index }) => (
              <Combo
                style={{
                  marginLeft: index === 0 ? 10 : 0,
                  marginRight: index === combos?.length - 1 ? 10 : 0,
                }}
                Id={item?.Id}
                name={item?.nmProduto}
                // description={item?.Observacao}
                price={item}
                image={item?.url_imagem}
                onPress={() => handleNavigateToDetail(item)}
              />
            )}
          />
        </Container>
      )}
      <Padding>
        <Title>Alguns Produtos</Title>
        <Info>Clique em qualquer item para adicionar ao carrinho</Info>
      </Padding>
      {withProdutos.map((grupo) => {
        if (grupo?.produtos?.length !== 0) {
          return (
            <Container
              key={grupo?.nmGrupo + grupo?.Id}
              style={{ marginBottom: 0 }}
            >
              <Padding>
                <ListItems
                  name={capitalize(grupo?.nmGrupo)}
                  items={grupo?.produtos}
                  onPlus={() =>
                    handleNavigateToGrupo(grupo?.Id, capitalize(grupo?.nmGrupo))
                  }
                  plus={grupo?.__meta__?.produtos_count > grupo?.produtos?.length}
                />
              </Padding>
            </Container>
          );
        } else {
          return <></>;
        }
      })}
    </Layout>
  );
}
