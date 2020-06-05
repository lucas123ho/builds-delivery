import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { Container, TextButton, ContainerText, ContainerTotal } from "./styles";
import { ButtonBottomProps } from "./types";
import { formatMoney } from "@utils/functions";
import colors from "@root/styles/colors";

export default function ButtonBottom({
  active,
  onPress,
  text = "Continuar",
  total,
}: ButtonBottomProps) {
  return (
    <Container onPress={onPress} active={active}>
      {!!total ? (
        <ContainerText>
          <TextButton style={{ color: colors.white }}>{text}</TextButton>
          <ContainerTotal>
            <TextButton active={active}>
              {formatMoney(total)}
            </TextButton>
            <MaterialIcons
              size={20}
              color={colors.yellow}
              name="arrow-forward"
              style={{
                marginLeft: 10,
              }}
            />
          </ContainerTotal>
        </ContainerText>
      ) : (
        <TextButton active={active}>{text}</TextButton>
      )}
    </Container>
  );
}
