import React from "react";
import { FlatList, ActivityIndicator, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Content, Button, TextButton } from "@styles/components";
import { Info, Image, Loading, NoContent, TextNoContent } from "./styles";
import Item from "@components/Item";
import TitlePage from "@components/TitlePage";
import colors from "@root/styles/colors";

interface ListProps {
  title: string;
  info?: string;
  data?: Array<any>;
  onSelect?: (value: string) => any;
  selected?: number | string;
  image?: string;
  icon?: string;
  keys?: {
    id?: string;
    title?: string;
    description?: string;
    price?: string;
    image?: string;
  };
  loading?: boolean;
  messageNoContent?: string;
  list?: {
    onEndReached: () => void;
    onEndReachedThreshold: number;
  };
}

export default function List({
  title,
  info = "",
  data = [],
  onSelect,
  image,
  selected,
  icon = "location-on",
  keys = {
    id: "id",
    title: "title",
    description: "description",
    price: "price",
    image: "image",
  },
  loading = false,
  messageNoContent = "Nada foi encontrado :(",
  list,
}: ListProps) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <Content
      style={{
        paddingBottom: 0,
      }}
    >
      <TitlePage title={title} />
      {!!info && <Info style={{ marginTop: 16 }}>{info}</Info>}
      {!!image && <Image source={{ uri: image }} resizeMode="cover" />}
      {loading ? (
        <Loading>
          <ActivityIndicator size={30} color={colors.blue} />
        </Loading>
      ) : JSON.stringify(data) !== "[]" ? (
        <FlatList
          {...list}
          data={data}
          keyExtractor={(item) => item?.[keys["title"]] + Math.random() * 2}
          renderItem={({ item }) => (
            <Item
              selected={
                selected === item?.[keys["id"]] ||
                selected === item?.[keys["title"]]
              }
              onPress={() => onSelect(item)}
              title={item?.[keys["title"]]}
              description={item?.[keys["description"]]}
              price={item?.[keys["price"]]}
              image={item?.[keys["image"]]}
              icon={icon}
            />
          )}
        />
      ) : (
        <NoContent>
          <TextNoContent>{messageNoContent}</TextNoContent>
          <Button onPress={() => navigation.goBack()}>
            <TextButton>Voltar</TextButton>
          </Button>
        </NoContent>
      )}
    </Content>
    </SafeAreaView>
  );
}
