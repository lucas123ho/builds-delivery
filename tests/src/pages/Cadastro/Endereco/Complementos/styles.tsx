import styled from "styled-components/native";

import { Text } from "@styles/components";
import colors from "@styles/colors";
import fonts from "@styles/fonts";
import { plataform } from "@root/utils/functions";

export const Container = styled.SafeAreaView`
  background-color: ${colors.white};
  flex: 1;
  position: relative;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 60,
  },
})`
  flex: 1;
  padding: ${() => plataform({ ios: "24px", android: "55px" })} 16px;
`;

export const Header = styled.TouchableOpacity`
  padding: 24px 0 24px 16px;
  margin-bottom: 36px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.whiteDark};
  border-top-width: 1px;
  border-top-color: ${colors.whiteDark};
  border-left-width: 3px;
  border-left-color: ${colors.whiteDark};
  border-right-width: 3px;
  border-right-color: ${colors.whiteDark};
  overflow: hidden;
`;

export const ContainerAddress = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Address = styled(Text)`
  font-size: ${fonts.sizes.normal};
  margin-left: 12px;
  line-height: ${fonts.lineHeights.normal};
  padding-right: 28px;
`;
