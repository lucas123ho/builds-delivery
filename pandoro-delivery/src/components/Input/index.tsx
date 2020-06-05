import React from "react";
import { AntDesign } from "@expo/vector-icons";

import {
  Container,
  Input as TextInput,
  Label,
  Info,
  ContainerInput,
  ButtonClear,
} from "./styles";
import { InputProps } from "./types";
import colors from "@root/styles/colors";

export default function Input({
  label = "",
  info,
  style,
  onClean,
  ...rest
}: InputProps) {
  return (
    <Container style={style}>
      <Label>{label}</Label>
      <ContainerInput>
        <TextInput {...rest} />
        {onClean && (
          <ButtonClear onPress={onClean}>
            <AntDesign name="close" size={16} color={colors.gray} />
          </ButtonClear>
        )}
      </ContainerInput>
      <Info>{info}</Info>
    </Container>
  );
}
