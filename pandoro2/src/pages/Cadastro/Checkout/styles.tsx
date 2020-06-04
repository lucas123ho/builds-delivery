import styled from "styled-components/native";

import colors from "@styles/colors";
import fonts from "@styles/fonts";
import { Text } from '@styles/components';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
})`
  flex: 1;
  padding: 33px;
`;

export const Title = styled(Text).attrs({
  bold: true
})`
  font-size: ${fonts.sizes.medium};
  margin-bottom: 35px;
  text-align: center;
`; 
