import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector } from 'react-redux';

import {
  Container,
  Content,
  Avatar,
  ContainerText,
  Infos,
  Title,
  Description,
  Image,
} from "./styles";
import colors from "@styles/colors";
import { formatMoney, cut, capitalize } from "@utils/functions";
import { ApplicationState } from "@root/store";
import Price from '@components/Price';
import { Produto } from '@root/types/db';

interface ComboProps extends TouchableOpacityProps {
  Id?: number;
  name?: string;
  description?: string;
  price?: Produto;
  image?: string;
}

export default function Combo({
  Id,
  name,
  description,
  price,
  image,
  style,
  ...rest
}: ComboProps) {
  return (
    <Container style={style} {...rest}>
      <Content>
        {!!image ? (
          <Image source={{ uri: image }} resizeMode="cover" />
        ) : (
          <Avatar>
            <Feather name="layers" size={40} color={colors.lightGray} />
          </Avatar>
        )}

        <ContainerText>
          <Infos>
            <Title>{capitalize(name)}</Title>
            {!!description && <Description>{cut(description, 60, " ...")}</Description>}
          </Infos>
          <Price produto={price} />
        </ContainerText>
      </Content>
    </Container>
  );
}
