import styled from "styled-components/native";

import colors from "@styles/colors";
import { Text } from "@styles/components";
import fonts from "@root/styles/fonts";

export const Container = styled.TouchableOpacity`
  position: relative;
  flex-direction: row;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${colors.lightGray};
  margin-bottom: 12px;
  overflow: hidden;
`;

export const ContainerImage = styled.View`
  border-right-width: 1px;
  border-right-color: ${colors.lightGray};
  /* height: 100%; */
  width: 100px;
  align-items: center;
  justify-content: center;
  /* height: 100%; */
`;

export const ContentImage = styled.View`
  width: 100px;
  flex: 1;
  background-color: ${colors.whiteIce};
  align-items: center;
  justify-content: center;
`;

export const ContainerText = styled.View`
  padding: 18px 20px;
  flex: 1;
  justify-content: center;
`;

export const Title = styled(Text).attrs({
  bold: true,
})`
  font-size: ${fonts.sizes.normal};
`;

export const Description = styled(Text)`
  font-size: ${fonts.sizes.small};
  color: ${colors.gray};
  margin-top: 3px;
`;

export const Price = styled(Text)`
  font-size: ${fonts.sizes.normal};
  color: ${colors.green};
  margin-top: 10px;
`;

export const Image = styled.Image`
  height: 100%;
  width: 100px;
`;

export const ContainerIsCombo = styled.View`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100px;
  padding: 4px;
  background-color: ${colors.green};
  align-items: center;
  justify-content: center;
`;

export const TextIsCombo = styled(Text)`
  font-size: ${fonts.sizes.small};
  color: ${colors.white};
`;