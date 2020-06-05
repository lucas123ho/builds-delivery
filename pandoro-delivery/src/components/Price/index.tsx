import React from "react";

import { Container, PrecoAntigo, PrecoAtual, Traco } from "./styles";
import { Produto } from "@root/types/db";
import { formatMoney } from "@root/utils/functions";

interface PriceProps {
  produto: Produto;
}

export default function Price({ produto }: PriceProps) {
  if (produto?.promocao) {
    return (
      <Container>
        <PrecoAntigo>{formatMoney(produto?.vlPreco)}</PrecoAntigo>
        <Traco>  -  </Traco>
        <PrecoAtual>{formatMoney(produto?.promocao?.vlPromocao)}</PrecoAtual>
      </Container>
    );
  } else {
    if (produto?.vlPromocao < produto?.vlPreco) {
      return (
        <Container>
          <PrecoAntigo>{formatMoney(produto?.vlPreco)}</PrecoAntigo>
          <Traco>  -  </Traco>
          <PrecoAtual>{formatMoney(produto?.vlPromocao)}</PrecoAtual>
        </Container>
      );
    } else {
      return (
        <Container>
          <PrecoAtual>{formatMoney(produto?.vlPreco)}</PrecoAtual>
        </Container>
      );
    }
  }
}
