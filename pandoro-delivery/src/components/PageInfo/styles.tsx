import styled from "styled-components/native";

import { ContainerCenter, Text } from "@styles/components";
import colors from "@styles/colors";
import fonts from "@styles/fonts";

export const Container = styled(ContainerCenter)`
  background-color: ${colors.white};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: { flexGrow: 1, justifyContent: "center" },
})``;

export const Image = styled.Image`
  width: 100%;
  margin-bottom: 23px;
`;

export const Padding = styled.View`
  padding: 0 36px 0 36px;
`;

export const Title = styled(Text).attrs({
  bold: true,
})`
  font-size: ${fonts.sizes.medium};
  text-align: center;
`;

export const TextInfo = styled(Text)`
  color: ${colors.gray};
  font-size: ${fonts.sizes.normal};
  margin: 12px 0 24px 0;
  text-align: center;
  line-height: ${fonts.lineHeights.normal};
`;
