import styled from "styled-components/native";

import { Text } from "@styles/components";
import { TextProps } from "@styles/components/types";
import fonts from "@styles/fonts";
import colors from "@styles/colors";

interface ContentTextProps extends TextProps {
  empty?: boolean;
}

export const Container = styled.View`
  margin-bottom: 12px;
`;

export const Label = styled(Text)`
  font-size: ${fonts.sizes.small};
  margin-bottom: 8px;
`;

export const Select = styled.TouchableOpacity`
  padding: 20px 18px;
  flex-direction: row;
  background-color: ${colors.whiteIce};
  align-items: center;
  border-radius: 5px;
`;

export const ContainerText = styled.View`
  flex: 1;
`;

export const ContentText = styled(Text)`
  font-size: 16px;
  color: ${({ empty }: ContentTextProps) =>
    empty ? colors.lightGray : colors.black};
`;

export const SubTitle = styled(Text)`
  font-size: ${fonts.sizes.normal};
  margin-top: 3px;
`;

export const ContainerInfo = styled.View`
  padding: 8px 22px 0 22px;
`;

export const Info = styled(Text)`
  font-size: ${fonts.sizes.small};
  color: ${colors.gray};
`;
