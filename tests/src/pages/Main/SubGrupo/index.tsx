import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

// import { Container } from './styles';
import { capitalize, getSubGrupo, returnPrice } from "@root/utils/functions";
import { Content } from "@root/styles/components";
import HeaderIput from "@components/HeaderInput";
import TitlePage from "@components/TitlePage";
import { ContainerLoading } from "../Busca/styles";
import colors from "@root/styles/colors";
import { SubGrupoWithProdutos } from "@root/types/db";
import { FlatList } from "react-native-gesture-handler";
import Item from "@root/components/Item";
import ButtonFinalize from "@root/components/ButtonFinalize";
import { ApplicationState } from "@root/store";

export default function SubGrupo({ route }) {
  const { subGrupo_id, title_grupo, title, grupo_id } = route.params;
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [subGrupo, setSubGrupo] = useState<SubGrupoWithProdutos>();
  const [subGrupoSearch, setSubGrupoSearch] = useState<SubGrupoWithProdutos>();
  const [total, setTotal] = useState<number>();
  const [page, setPage] = useState(1);
  const [requesting, setRequesting] = useState(false);
  const [timer, setTimer] = useState<number>(0);
  const navigation = useNavigation();

  useEffect(() => {
    async function getData() {
      const subGrupo = await getSubGrupo(subGrupo_id, grupo_id);
      setSubGrupo(subGrupo);
      setTotal(Math.floor(subGrupo?.total / 10));
      setLoading(false);
    }
    getData();
  }, []);

  async function loadPage() {
    if (!requesting) {
      if (page < total) {
        setRequesting(true);
        const result = await getSubGrupo(subGrupo_id, grupo_id, page + 1);
        setRequesting(false);
        setSubGrupo({
          ...subGrupo,
          produtos: [...subGrupo?.produtos, ...result?.produtos],
        });
        setPage(page + 1);
      }
    }
  }

  function handleNavigateToDetail(item) {
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

  useEffect(() => {
    async function getData() {
      if (!requesting) {
        setLoading(true);
        setRequesting(true);
        const subGrupo = await getSubGrupo(subGrupo_id, grupo_id, 1, search);
        setSubGrupoSearch(subGrupo);
        setLoading(false);
        setRequesting(false);
      }
    }
    if (search) {
      clearTimeout(timer);
      setTimer(setTimeout(getData, 1000));
    }
  }, [search]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Content style={{ paddingBottom: 0 }}>
        {searching ? (
          <HeaderIput
            onBack={() => {
              setSearch("");
              setTimeout(() => setSearching(false), 500);
            }}
            search={search}
            setSearch={setSearch}
            style={{
              marginTop: 0,
              borderRadius: 5,
            }}
          />
        ) : (
          <TitlePage
            title={`${title_grupo} > ${capitalize(title)}`}
            search={true}
            onSearch={() => setSearching(true)}
          />
        )}
        {loading ? (
          <ContainerLoading>
            <ActivityIndicator color={colors.blue} size={30} />
          </ContainerLoading>
        ) : !search ? (
          <FlatList
            style={{ paddingTop: 24 }}
            contentContainerStyle={{ paddingBottom: 24 }}
            onEndReached={loadPage}
            onEndReachedThreshold={0.4}
            data={subGrupo?.produtos}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => String(item?.Id)}
            renderItem={({ item }) => (
              <Item
                title={item?.nmProduto}
                price={item}
                image={item?.url_imagem}
                onPress={() => handleNavigateToDetail(item)}
                // selected={itens_selecionados.indexOf(item?.Id) !== -1}
                icon="shopping-cart"
              />
            )}
          />
        ) : (
          <FlatList
            style={{ paddingTop: 24 }}
            contentContainerStyle={{ paddingBottom: 24 }}
            data={subGrupoSearch?.produtos}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => String(item?.Id)}
            renderItem={({ item }) => (
              <Item
                title={item?.nmProduto}
                price={item}
                image={item?.url_imagem}
                onPress={() => handleNavigateToDetail(item)}
                // selected={itens_selecionados.indexOf(item?.Id) !== -1}
                icon="shopping-cart"
              />
            )}
          />
        )}
      </Content>
      <ButtonFinalize />
    </SafeAreaView>
  );
}
