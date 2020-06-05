import styled from "styled-components/native";
import Constants from 'expo-constants';

import colors from "@styles/colors";
import fonts from "@styles/fonts";
import { plataform } from "@utils/functions";

export const Container = styled.View`
  background-color: ${colors.white};
  align-items: center;
  flex-direction: row;
  margin-top: ${plataform({
    android: Constants.statusBarHeight + "px",
    ios: "0px",
  })};
`;

export const ButtonBack = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 14px;
`;

export const HeaderInput = styled.TextInput`
  font-family: ${fonts.normal};
  font-size: ${fonts.sizes.normal};
  padding: 14px 0;
  flex: 1;
`;
