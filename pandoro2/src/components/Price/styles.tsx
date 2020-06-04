import styled from 'styled-components/native';

import { Text } from '@root/styles/components';
import fonts from '@root/styles/fonts';
import colors from '@root/styles/colors';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

export const PrecoAtual = styled(Text)`
  font-size: ${fonts.sizes.normal};
  color: ${colors.green};
`;

export const PrecoAntigo = styled(Text)`
  font-size: ${fonts.sizes.normal};
  color: ${colors.gray};
  text-decoration: line-through;
  text-decoration-style: solid;
`;

export const Traco = styled(Text)`
  font-size: ${fonts.sizes.normal};
  color: ${colors.gray};
`;
