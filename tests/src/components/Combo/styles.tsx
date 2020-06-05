import styled from "styled-components/native";

import colors from "@root/styles/colors";
import { Text } from "@root/styles/components";
import fonts from "@root/styles/fonts";

interface ActiveProps {
  active?: boolean;
}

export const Container = styled.TouchableOpacity`
  padding-left: 6px;
  padding-right: 6px;
`;

export const Content = styled.View`
  width: 160px;
  min-height: 207px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${({ active }: ActiveProps) => active ? colors.blue : colors.lightGray};
  overflow: hidden;
  flex: 1;
`;

export const Avatar = styled.View`
  width: 100%;
  height: 85px;
  background-color: ${colors.whiteIce};
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image`
  width: 100%;
  height: 85px;
`;

export const ContainerText = styled.View`
  flex: 1;
  padding: 12px;
  justify-content: space-between;
`;

export const Infos = styled.View``;

export const Title = styled(Text).attrs({
  bold: true,
})`
  font-size: ${fonts.sizes.normal};
  margin-bottom: 2px;
`;

export const Description = styled(Text)`
  font-size: ${fonts.sizes.small};
  color: ${colors.gray};
  margin-bottom: 10px;
  line-height: 17px;
`;

export const Price = styled(Text)`
  font-size: ${fonts.sizes.normal};
  color: ${colors.green};
`;
