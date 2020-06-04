import styled from "styled-components/native";

import colors from "@styles/colors";
import fonts from "@styles/fonts";
import { Text } from "@styles/components";

export const Container = styled.View`
  align-self: stretch;
  position: relative;
`;

export const ContainerInput = styled.View`
  position: relative;
  border-radius: 5px;
  overflow: hidden;
`;

export const ButtonClear = styled.TouchableOpacity`
  padding: 0 16px;
  position: absolute;
  align-items: center;
  justify-content: center;
  height: 95%;

  right: 3px;
  top: 1px;
  bottom: 3px;

  background-color: white;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.lightGray,
})`
  padding: 13px 40px 13px 15px;
  border-radius: 5px;
  align-self: stretch;
  font-size: ${fonts.sizes.normal};
  font-family: ${fonts.normal};
  border-width: 1px;
  border-color: ${colors.black};
  font-family: ${fonts.bold};
`;

export const Label = styled(Text)`
  position: absolute;
  background-color: ${colors.white};
  font-size: ${fonts.sizes.small};
  left: 7px;
  top: -6px;
  padding: 0 8px;
  z-index: 10;
`;

export const Info = styled(Text)`
  font-size: ${fonts.sizes.small};
  color: ${colors.gray};
  padding: 9px 15px 0 15px;
`;