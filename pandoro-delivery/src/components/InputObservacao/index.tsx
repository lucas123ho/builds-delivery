import React from "react";

import { Container, Title, Input } from "./styles";
import { InputObservacaoProps } from "./types";

export default function InputObservacao({
  label = "Observação do item:",
  placeholder = "Ex.: Hamburguer sem picles",
  ...rest
}: InputObservacaoProps) {
  return (
    <Container>
      <Title>{label}</Title>
      <Input
        {...rest}
        multiline={true}
        placeholder={placeholder}
      />
    </Container>
  );
}
