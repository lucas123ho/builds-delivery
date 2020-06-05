import styled from "styled-components/native";

import colors from "@styles/colors";
import fonts from "@styles/fonts";
import { Text } from "@styles/components";

export const Info = styled(Text)`
  font-size: ${fonts.sizes.normal};
  color: ${colors.gray};
  margin-bottom: 20px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 5px;
  /* margin: 20px 0; */
  margin-bottom: 40px;
`;

export const Loading = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const NoContent = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const TextNoContent = styled(Text)`
  font-size: ${fonts.sizes.medium};
  text-align: center;
  margin-bottom: 16px;
`;
