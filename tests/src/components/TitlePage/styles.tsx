import styled from 'styled-components/native';

import { Text } from '@styles/components';
import fonts from '@styles/fonts';
import colors from '@root/styles/colors';

export const Container = styled.View`
  flex-direction: row;
  padding-bottom: 16px;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.whiteIce};
`;

export const Title = styled(Text).attrs({
  bold: true
})`
  font-size: ${fonts.sizes.normal};
  flex: 1;
`;

export const ButtonBack = styled.TouchableOpacity`
  padding-right: 25px;
`;

export const ButtonSearch = styled.TouchableOpacity`
  padding-left: 25px;
`;