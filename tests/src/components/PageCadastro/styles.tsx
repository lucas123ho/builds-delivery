import styled from 'styled-components/native';

import colors from '@styles/colors';
import fonts from '@styles/fonts';
import { Text } from '@styles/components';
import { plataform } from '@utils/functions';


export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding: 33px 16px;
`;

export const Title = styled(Text)`
  font-size: ${fonts.sizes.medium};
  margin-bottom: 36px;
  margin-top: ${() => plataform({ ios: "0px", android: "36px" })};
`;

export const Destaque = styled(Title).attrs({
  bold: true
})``;
