import styled from "styled-components/native";

import colors from "@root/styles/colors";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
`;

export const Content = styled.View`
  flex: 1;
`;

export const ContainerLoading = styled.View`
  padding: 26px;
`;

export const ContainerContent = styled.View`
  padding-top: 26px;
`;