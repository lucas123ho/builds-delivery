import styled from 'styled-components/native';

import colors from '@root/styles/colors';
import { Text } from '@root/styles/components';
import fonts from '@root/styles/fonts';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Background = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: -1;
`;

export const Content = styled.View`
  width: 90%;
  background-color: ${colors.white};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  padding: 27px;
`;

export const Title = styled(Text).attrs({
  bold: true
})`
  font-size: ${fonts.sizes.normal};
  text-align: center;
  margin-bottom: 6px;
  line-height: ${fonts.lineHeights.normal};
`;

export const SubTitle = styled(Text)`
  font-size: ${fonts.sizes.normal};
  text-align: center;
  color: ${colors.gray};
  margin-bottom: 24px;
  line-height: ${fonts.lineHeights.normal};
`