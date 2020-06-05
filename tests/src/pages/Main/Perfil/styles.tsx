import styled from 'styled-components/native';

import { Text } from '@root/styles/components';
import fonts from '@styles/fonts';
import colors from '@styles/colors';

export const Container = styled.ScrollView``;

export const Title = styled(Text).attrs({
  bold: true
})`
  font-size: ${fonts.sizes.medium};
  margin-bottom: 16px;
`;

export const ContainerButton = styled.TouchableOpacity`
  padding: 24px 18px;
  background-color: ${colors.whiteIce};
  border-radius: 5px;
  margin-bottom: 24px;
`;

export const ContentButton = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ContainerText = styled.View`
  flex: 1;
`;

export const ContentText = styled.View`
  /* margin-bottom: 16px; */
`;

export const Label = styled(Text)`
  font-size: ${fonts.sizes.small};
`;

export const TextButton = styled(Text).attrs({
  bold: true
})`
  font-size: ${fonts.sizes.normal};
`;
