import styled from 'styled-components/native';

import { Text } from '@root/styles/components';
import fonts from '@root/styles/fonts';
import colors from '@root/styles/colors';

export const Container = styled.View``;

export const Title = styled(Text).attrs({
  bold: true
})`
  font-size: ${fonts.sizes.normal};
  margin-bottom: 8px;
  color: ${colors.gray};
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.lightGray
})`
  padding: 11px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${colors.lightGray};
  height: 67px;
  font-family: ${fonts.normal};
  font-size: ${fonts.sizes.small};
  line-height: ${fonts.lineHeights.small};
`
