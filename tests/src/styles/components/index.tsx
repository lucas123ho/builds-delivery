import React from "react";
import styled from "styled-components/native";
import {} from "react-native";

import colors from "./../colors";
import fonts from "./../fonts";
import { TextProps } from "./types";
import { plataform } from "@utils/functions";

export const Text = styled.Text`
  color: ${colors.black};
  font-family: ${({ bold = false }: TextProps) =>
    bold ? fonts.bold : fonts.normal};
`;

export const ContainerCenter = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.TouchableOpacity`
  align-self: stretch;
  border-radius: 5px;
  background-color: ${colors.blue};
  padding: 18px;
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled(Text).attrs({
  bold: true,
})`
  font-size: ${fonts.sizes.normal};
  color: ${colors.white};
`;

export const ContainerContent = styled.View`
  background-color: ${colors.white};
  flex: 1;
`;

export const ContentContent = styled.View`
  flex: 1;
  overflow: visible;
  padding: ${() => plataform({ ios: "33px 16px", android: "69px 16px" })};
`;

interface ContentProps {
  style?: any;
  children?: any;
}

export function Content({ children, style }: ContentProps) {
  return (
    <ContainerContent>
      <ContentContent style={style}>{children}</ContentContent>
    </ContainerContent>
  );
}

export const Padding = styled.View`
  padding-left: 16px;
  padding-right: 16px;
`;

export const Divisor = styled.View`
  align-self: stretch;
  height: 1px;
  background-color: ${colors.whiteIce};
  margin: 32px 0;
`;
