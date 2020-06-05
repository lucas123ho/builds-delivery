import React from "react";
import { AntDesign } from "@expo/vector-icons";

import {
  Container,
  Label,
  Select as Button,
  ContainerText,
  ContentText,
  SubTitle,
  ContainerInfo,
  Info,
} from "./styles";
import colors from "@styles/colors";
import { SelectProps } from "./types";

export default function Select({
  label,
  title = "",
  subTitle = "",
  button,
  info,
  ...rest
}: SelectProps) {
  const empty = !!!title;

  return (
    <Container {...rest}>
      {!!label && <Label>{label}</Label>}
      <Button {...button}>
        <ContainerText>
          <ContentText bold={true} empty={empty}>
            {empty ? "Clique para selecionar" : title}
          </ContentText>
          {!!subTitle && <SubTitle>{subTitle}</SubTitle>}
        </ContainerText>
        <AntDesign name="right" size={16} color={colors.blue} />
      </Button>
      {info && (
        <ContainerInfo>
          <Info>{info}</Info>
        </ContainerInfo>
      )}
    </Container>
  );
}
