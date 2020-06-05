import React from "react";
import { useNavigation } from "@react-navigation/native";
// import { useSelector } from 'react-redux';

import { Container, ContainerTitle, Title, Plus, TextPlus } from "./styles";
import Item from "../Item";
import { Produto } from "@root/types/db";
import { capitalize, returnPrice } from "@utils/functions";
// import { ApplicationState } from "@root/store";

interface ListItemsProps {
  name?: string;
  items?: Produto[];
  onPlus?: () => void;
  plus?: boolean;
}

export default function ListItems({
  name,
  items,
  onPlus,
  plus = true,
}: ListItemsProps) {
  const navigation = useNavigation();
  // const { itens_selecionados } = useSelector((state: ApplicationState) => state.sale);

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

  return (
    <Container>
      <ContainerTitle>
        <Title>{capitalize(name)}</Title>
      </ContainerTitle>
      {items?.map((item) => (
        <Item
          key={item?.nmProduto + item?.Id}
          title={item?.nmProduto}
          price={item}
          icon="shopping-cart"
          iconSize={46}
          image={item?.url_imagem}
          onPress={() => handleNavigateToDetail(item)}
          // selected={itens_selecionados?.indexOf(item?.Id) !== -1}
        />
      ))}
      {plus && (
        <Plus onPress={onPlus}>
          <TextPlus>+ Ver mais</TextPlus>
        </Plus>
      )}
    </Container>
  );
}
