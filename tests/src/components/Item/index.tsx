import React, { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacityProps } from "react-native";

import {
  Container,
  ContentImage,
  ContainerImage,
  ContainerText,
  Title,
  Description,
  Image,
  ContainerIsCombo,
  TextIsCombo,
} from "./styles";
import colors from "@styles/colors";
import { formatMoney, capitalize } from "@utils/functions";
import { Produto } from "@root/types/db";
import Price from "@components/Price";

interface ItemProps extends TouchableOpacityProps {
  title: string;
  selected?: boolean;
  description?: string;
  price?: Produto;
  icon?: string;
  iconSize?: number;
  image?: string;
}

export default function Item({
  title,
  selected,
  description,
  price,
  icon = "location-on",
  iconSize = 36,
  image,
  ...rest
}: ItemProps) {
  return (
    <Container
      {...rest}
      style={{
        borderColor: selected ? colors.blue : colors.lightGray,
        opacity: price?.qtdEstoque <= 0 ? 0.7 : 1
      }}
      disabled={price?.qtdEstoque <= 0}
    >
      {image ? (
        <Image source={{ uri: image }} resizeMode="cover" />
      ) : (
        <ContainerImage>
          <ContentImage>
            <MaterialIcons
              name={icon}
              size={iconSize * 0.7}
              color={colors.lightGray}
            />
          </ContentImage>
        </ContainerImage>
      )}
      {price?.isComposto === true && price?.qtdEstoque > 0 && (
        <ContainerIsCombo>
          <TextIsCombo>Combo</TextIsCombo>
        </ContainerIsCombo>
      )}
      {price?.qtdEstoque <= 0 && (
        <ContainerIsCombo style={{ backgroundColor: colors.red }}>
          <TextIsCombo>Esgotado</TextIsCombo>
        </ContainerIsCombo>
      )}
      <ContainerText>
        <Title
          style={{
            color: selected ? colors.blue : colors.black,
          }}
        >
          {capitalize(title)}
        </Title>
        {!!description && <Description>{description}</Description>}
        {!!price && <Price produto={price} />}
      </ContainerText>
    </Container>
  );
}
