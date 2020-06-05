import styled from 'styled-components/native';

import colors from '@root/styles/colors';

export const ContainerButtons = styled.View`
  flex-direction: row;
`;

export const Cancel = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: ${colors.red};
  margin-right: 2px;
`;