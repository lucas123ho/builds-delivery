import styled from 'styled-components/native';

import colors from '@styles/colors';
import fonts from '@styles/fonts';
import { Text } from '@styles/components';
import { plataform } from '@utils/functions';

export const Header = styled.View`
  padding-bottom: 10px;
  border-bottom-width: 2px;
  border-bottom-color: ${colors.whiteIce};
`;

export const Container = styled.SafeAreaView`
  background-color: ${colors.white};
  flex: 1;
  position: relative;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 60
  },
})`
  flex: 1;
  padding: 33px 16px;
`;


export const Title = styled(Text)`
  font-size: ${fonts.sizes.medium};
  margin-bottom: 30px;
  margin-top: ${() => plataform({ ios: "0px", android: "36px" })};
`;

export const Destaque = styled(Title).attrs({
  bold: true
})``;

export const ContainerLocation = styled.TouchableOpacity`
  padding: 20px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.whiteIce};
  flex-direction: row;
  align-items: center;
`;

export const TitleLocation = styled(Text)`
  font-size: ${fonts.sizes.normal};
  flex: 1;
  margin-left: 12px;
  line-height: ${fonts.lineHeights.normal};
`;
