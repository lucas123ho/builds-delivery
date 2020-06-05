import styled from "styled-components/native";
import colors from "@root/styles/colors";
import { Text } from "@root/styles/components";
import fonts from "@root/styles/fonts";

export const Container = styled.ScrollView`
  padding: 16px 0;
  flex: 1;
`;

export const ContainerPedido = styled.TouchableOpacity`
  position: relative;
  background-color: ${colors.white};
  border-radius: 5px;
  overflow: hidden;
  border-color: ${colors.whiteDark};
  border-width: 1px;
  padding: 16px 16px 16px 20px;
  margin-bottom: 12px;
`;

export const Detalhe = styled.View`
  position: absolute;
  height: auto;
  width: 4px;
  background-color: ${colors.green};
  left: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 10;
`;

export const TitlePedido = styled(Text).attrs({
  bold: true,
})`
  font-size: ${fonts.sizes.normal};
`;

export const FormaPagamento = styled(Text)`
  font-size: ${fonts.sizes.normal};
  color: ${colors.gray};
`

export const Status = styled(Text).attrs({
  bold: true
})`
  margin-top: 12px;
  font-size: ${fonts.sizes.small};
`;

export const Total = styled(Text)`
  font-size: ${fonts.sizes.normal};
  color: ${colors.green};
  margin-top: 12px;
`;

export const Title = styled(Text).attrs({
  bold: true
})`
  font-size: ${fonts.sizes.medium};
  margin: 8px 0 16px 0;
  color: ${colors.blue};
`;