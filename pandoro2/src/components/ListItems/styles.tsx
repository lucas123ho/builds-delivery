import styled from 'styled-components/native';

import colors from '@root/styles/colors';
import { Text } from '@root/styles/components';
import fonts from '@root/styles/fonts';

export const Container = styled.View`
  margin-top: 24px; 
`;

export const ContainerTitle = styled.View`
  padding-bottom: 5px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.whiteIce};
  margin-bottom: 12px;
`;

export const Title = styled(Text).attrs({
  bold: true
})`
  font-size: ${fonts.sizes.normal};
`;

export const Plus = styled.TouchableOpacity`
  align-items: center;
  padding: 16px;
  background-color: ${colors.whiteIce};
  border-radius: 5px;
`;

export const TextPlus = styled(Text).attrs({
  bold: true
})`
  font-size: ${fonts.sizes.normal};
  color: ${colors.blue};
`;
