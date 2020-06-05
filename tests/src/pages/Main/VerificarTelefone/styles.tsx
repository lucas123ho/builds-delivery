import styled from 'styled-components/native';

import { Text } from '@root/styles/components';
import fonts from '@root/styles/fonts';
import colors from '@root/styles/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Title = styled(Text)`
  font-size: ${fonts.sizes.medium};
  margin-bottom: 16px;
  align-items: center;
  text-align: center;
`;

export const Info = styled(Text)`
  font-size: ${fonts.sizes.normal};
  text-align: center;
  color: ${colors.gray};
`;

export const CodeInput = styled.TextInput`

  padding: 12px;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: ${fonts.sizes.big};
  font-family: ${fonts.bold};
  border-width: 2px;
  border-color: ${colors.lightGray};
  border-radius: 5px;
  margin-right: 12px;
  color: ${colors.blue};
`;