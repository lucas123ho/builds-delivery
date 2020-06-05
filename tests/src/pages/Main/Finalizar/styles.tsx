import styled from "styled-components/native";

import { Text } from "@styles/components";
import fonts from "@root/styles/fonts";
import colors from "@root/styles/colors";

export const Head = styled(Text).attrs({
  bold: true,
})`
  font-size: ${fonts.sizes.medium};

  margin: 20px 0 16px 0;
`;

export const ContainerTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled(Text).attrs({
  // bold: true
})`
  font-size: ${fonts.sizes.normal};
  /* margin: 0px 0 20px 0; */
  margin-bottom: 12px;
  flex: 1;
`;

export const AddMoreItems = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  /* padding: 20px 0 20px 0; */
`;

export const ContentAddMoreItems = styled(Text).attrs({
  // bold: true
})`
  font-size: ${fonts.sizes.normal};
  color: ${colors.blue};
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

export const ObservacaoPgamento = styled(Text).attrs({
  bold: true,
})`
  font-size: ${fonts.sizes.normal};
  color: ${colors.green};
  margin: 10px 0;
`;

export const ContainerObservacao = styled.View`
  padding: 10px;
`;

export const Observacao = styled(Text)`
  font-size: ${fonts.sizes.small};
  color: ${colors.gray};
  line-height: ${fonts.lineHeights.small};
`;

export const ContainerSelect = styled.TouchableOpacity`
  padding: 20px 18px;
  flex-direction: row;
  background-color: ${colors.whiteIce};
  align-items: center;
  border-radius: 5px;
  margin-top: 15px;
`;

export const ContainerBall = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${colors.blue};
  padding: 2px;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

export const Ball = styled.View`
  height: 15px;
  width: 15px;
  background-color: ${colors.blue};
  border-radius: 7.5px;
`;

export const TextSelect = styled(Text)`
  font-size: ${fonts.sizes.normal};
  font-family: ${fonts.bold};
`;
