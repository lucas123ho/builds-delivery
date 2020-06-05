import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Container, ButtonBack, Title, ButtonSearch } from "./styles";
import colors from "@styles/colors";

interface TitlePageProps {
  title: string;
  search?: boolean;
  searching?: boolean;
  onSearch?: () => void;
}

export default function TitlePage({
  title,
  search = false,
  searching = false,
  onSearch = () => {}
}: TitlePageProps) {
  const navigation = useNavigation();

  return (
    <>
      {searching ? (
        <></>
      ) : (
        <Container>
          <ButtonBack
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.black} />
          </ButtonBack>
          <Title>{title}</Title>
          {search && (
            <ButtonSearch onPress={onSearch}>
              <MaterialIcons name="search" size={24} color={colors.black} />
            </ButtonSearch>
          )}
        </Container>
      )}
    </>
  );
}
