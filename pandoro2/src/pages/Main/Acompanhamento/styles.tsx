import styled from "styled-components/native";

import colors from "@root/styles/colors";
import { Text } from "@root/styles/components";
import fonts from "@root/styles/fonts";
import { plataform } from "@root/utils/functions";

interface ActiveProps {
  active?: boolean;
}

export const ContainerLoading = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
`; 

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
  padding: ${() => plataform({ ios: "33px 16px 0 16px", android: "69px 16px 0 16px" })};
`;

export const Content = styled.ScrollView`
  flex: 1;
`;

export const Header = styled.View``;

export const Title = styled(Text).attrs({
  bold: true,
})`
  font-size: ${fonts.sizes.medium};
  margin-bottom: 12px;
`;

export const Info = styled(Text)`
  font-size: ${fonts.sizes.medium};
  line-height: ${fonts.lineHeights.medium};
  color: ${colors.gray};
`;

export const ContainerStatus = styled.View`
  position: relative;
`;

export const Status = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
`;

export const BallStatus = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${({ active }: ActiveProps) =>
    active ? colors.green : colors.lightGray};
  margin-right: 12px;
`;

export const TextStatus = styled(Text).attrs(({ active }: ActiveProps) => ({
  bold: active
}))`
  font-size: ${fonts.sizes.normal};
  color: ${({active}: ActiveProps) => active ? colors.black : colors.gray};
`;

export const Line = styled.View`
  width: 1px;
  height: 100%;
  position: absolute;
  left: 8px;
  background-color: ${colors.whiteDark};
`;

export const ButtonCancel = styled.TouchableOpacity`
  padding: 18px 0;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  background-color: ${colors.whiteIce};
  border-radius: 5px;
`;

export const Cancel = styled(Text).attrs({
  bold: true
})`
  font-size: ${fonts.sizes.normal};
  color: ${colors.red};
`;

export const TitleDetalhes = styled(Text).attrs({
  bold: true
})`
  font-size: ${fonts.sizes.medium};
  margin-bottom: 16px;
`;


export const ItemSale = styled.TouchableOpacity`
  border-top-width: 1px;
  border-top-color: ${colors.whiteDark};
  padding: 16px 0 16px 0;
`;

export const ContentItemSale = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TitleItemSale = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const TextTitle = styled(Text)`
  font-size: ${fonts.sizes.small};
`;

export const QuantityItemSale = styled(Text).attrs({
  bold: true,
})`
  font-size: ${fonts.sizes.small};
  color: ${colors.blue};
  padding-right: 10px;
  /* background-color: red; */
`;

export const PriceItemSale = styled(Text)`
  font-size: ${fonts.sizes.small};
  color: ${colors.green};
`;

export const ContainerObservacao = styled.View`
  padding: 10px;
`;

export const Observacao = styled(Text)`
  font-size: ${fonts.sizes.small};
  color: ${colors.gray};
  line-height: ${fonts.lineHeights.small};
`;

export const ContainerAmount = styled.View`
  border-top-width: 2px;
  border-top-color: ${colors.whiteDark};
  border-bottom-width: 2px;
  border-bottom-color: ${colors.whiteDark};
  padding: 20px;
  background-color: ${colors.whiteIce};
  /* margin-bottom: 40px; */
`;

export const ContainerContentAmout = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

export const TextContentAmout = styled(Text)`
  font-size: ${fonts.sizes.normal};
  color: ${colors.gray};
`;
