import styled from 'styled-components/native';

import colors from '@styles/colors';
import fonts from '@styles/fonts';
import { Text } from '@styles/components';
import { ButtonBottomProps, TextButtonProps } from './types';

export const Container = styled.TouchableOpacity.attrs(({ active }: ButtonBottomProps): ButtonBottomProps => ({
  disabled: !active
}))`
  padding: 20px;
  align-self: stretch;
  flex: 1;
  background-color: ${({ active }: ButtonBottomProps) => active ? colors.blue : colors.lightGray};
  align-items: center;
  justify-content: center;
  max-height: 60px;
`;

export const TextButton = styled(Text).attrs({
  bold: true
})`
  font-size: ${fonts.sizes.normal};
  color: ${({ active }: TextButtonProps) => active ? colors.white : colors.gray};
`
export const ContainerText = styled.View`
  flex-direction: row;
  /* background-color: red; */
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const ContainerTotal = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;