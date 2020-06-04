import styled from 'styled-components/native';

import { Text } from '@styles/components';
import { TextProps } from '@styles/components/types';
import fonts from '@root/styles/fonts';
import colors from '@root/styles/colors';

interface TabTextProps extends TextProps {
  active?: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
`;

export const ContainerIcon = styled.View`
  position: relative;
`;

export const TabButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 10px 18px;
  position: relative;
`;

export const TabText = styled(Text).attrs(({ active }: TabTextProps): TabTextProps => ({
  bold: active,
}))`
  font-size: ${fonts.sizes.extraSmall};
  color: ${colors.black};
`;

export const ContainerCount = styled.View`
  position: absolute;
  top: 0px;
  height: 20px;
  width: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${colors.blue};
  z-index: 10;
`;

export const TextCount = styled(Text).attrs({
  bold: true
})`
  font-size: ${fonts.sizes.small};
  color: ${colors.white};

`