import styled from "styled-components/native";

import colors from "@root/styles/colors";
import fonts from "@root/styles/fonts";
import { Text } from "@root/styles/components";

export const Container = styled.TouchableOpacity`
  padding-left: 6px;
  padding-right: 6px;
  justify-content: center;
`;

export const Avatar = styled.View`
  height: 100px;
  width: 140px;
  border-radius: 5px;
  background-color: ${colors.whiteIce};
  border-width: 1px;
  border-color: ${colors.lightGray};
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

export const Image = styled.Image`
  height: 100px;
  width: 140px;
  border-radius: 5px;
  margin-bottom: 8px;
`;

export const Title = styled(Text)`
  font-size: ${fonts.sizes.small};
  justify-content: center;
  text-align: center;
`;
