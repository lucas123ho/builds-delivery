import styled from 'styled-components/native';

import { Text } from '@styles/components';
import fonts from '@root/styles/fonts';
import colors from '@root/styles/colors';

export const Container = styled.View`
  margin-bottom: 36px;
`;

export const Padding = styled.View`
  padding-left: 16px;
  padding-right: 16px;
`;

export const Title = styled(Text).attrs({
  bold: true
})`
  font-size: ${fonts.sizes.medium};
  margin-bottom: 12px;
  color: ${colors?.blue};
`;

export const Info = styled(Text)`
  font-size: ${fonts.sizes.small};
`;

export const ContainerGrupo = styled.View`
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.whiteDark};
`;

export const TitleGrupo = styled(Text).attrs({
  bold: true
})`
  font-size: ${fonts.sizes.normal};
  margin-bottom: 8px;
`;