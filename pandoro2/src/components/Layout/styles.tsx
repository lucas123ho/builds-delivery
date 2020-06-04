import styled from "styled-components/native";
import { ScrollViewProps } from "react-native";

import colors from "@styles/colors";
import { plataform } from "@utils/functions";

interface ContentProps extends ScrollViewProps {
  address?: boolean;
}

export const Container = styled.SafeAreaView`
  background-color: ${colors.white};
  flex: 1;
`;

export const Content = styled.ScrollView<ContentProps>`
  flex: 1;
  padding: ${({ address }: ContentProps) =>
    address
      ? plataform({ ios: "0px 0px", android: "17px 0px" })
      : plataform({ ios: "33px 0px", android: "69px 0px" })};
`;

export const Header = styled.View`
  background-color: ${colors.white};
  background-color: ${colors.whiteIce};
  padding: ${() =>
    plataform({ ios: "16px", android: "45px 16px 33px 16px" })};
  margin-bottom: 33px;
`;

export const ContainerAddress = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: 130px;
  height: 80px;
`;

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