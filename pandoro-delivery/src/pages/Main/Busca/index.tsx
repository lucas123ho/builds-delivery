import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, FlatList } from "react-native";
// import { useSelector } from "react-redux";

import {
  Container,
  Content,
  ContainerLoading,
  ContainerContent,
} from "./styles";
import colors from "@root/styles/colors";
import { Padding } from "@styles/components";
import { ResultSearch, Produto } from "../../../types/db";
import Layout from "@components/Layout";
import Category from "@components/Category";
import { search as searhRequest, capitalize, returnPrice } from "@utils/functions";
import Item from "@root/components/Item";
import HeaderInput from "@components/HeaderInput";
// import { ApplicationState } from "@root/store";

export default function Busca() {
  const navigation = useNavigation();
  const [result, setResult] = useState<ResultSearch>();
  const [search, setSearch] = useState("");
  const [timer, setTimer] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  // const { itens_selecionados } = useSelector(
  //   (state: ApplicationState) => state.sale
  // );

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const resultOfSearch = await searhRequest(search);
      setResult(resultOfSearch);
      setLoading(false);
    }

    if (!!search) {
      clearTimeout(timer);
      setTimer(setTimeout(getData, 1000));
    }
  }, [search]);

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
      opcoes: item?.opcoes
    });
  }

  return (
    <Container>
      <HeaderInput
        onBack={() => navigation.goBack()}
        search={search}
        setSearch={setSearch}
      />
      <Layout
        style={{ paddingTop: 0 }}
        address={false}
        center={false}
        onPressButtonBottom={() => navigation.navigate("Finalizar")}
      >
        <Content>
          {loading ? (
            <ContainerLoading>
              <ActivityIndicator size={30} color={colors.blue} />
            </ContainerLoading>
          ) : (
            <ContainerContent>
              {result?.grupos?.length !== 0 && (
                <FlatList
                  style={{ marginBottom: 36 }}
                  data={result?.grupos}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => String(item?.Id)}
                  renderItem={({ item, index }) => (
                    <Category
                      onPress={() =>
                        handleNavigateToGrupo(
                          item?.Id,
                          capitalize(item?.nmGrupo)
                        )
                      }
                      style={{
                        marginLeft: index === 0 ? 10 : 0,
                        marginRight:
                          index === result?.grupos?.length - 1 ? 10 : 0,
                      }}
                      text={capitalize(item?.nmGrupo)}
                      image={item?.url_imagem}
                    />
                  )}
                />
              )}
              <Padding>
                {result?.produtos?.map((produto) => (
                  <Item
                    key={String(produto?.Id)}
                    title={produto?.nmProduto}
                    price={produto}
                    image={produto?.url_imagem}
                    onPress={() => handleNavigateToDetail(produto)}
                    // selected={itens_selecionados.indexOf(produto?.Id) !== -1}
                    icon="shopping-cart"
                  />
                ))}
              </Padding>
            </ContainerContent>
          )}
        </Content>
      </Layout>
    </Container>
  );
}
