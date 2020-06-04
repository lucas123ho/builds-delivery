import styled from "styled-components/native";

import colors from "@root/styles/colors";
import fonts from "@root/styles/fonts";
import { Text } from "@root/styles/components";

export const Container = styled.ScrollView`
  flex: 1;
  margin-left: -16px;
  margin-right: -16px;
`;

export const Avatar = styled.View`
  align-self: stretch;
  height: 200px;
  background-color: ${colors.whiteIce};
  align-items: center;
  justify-content: center;
  margin-bottom: 22px;
`;

export const Image = styled.Image`
  height: 200px;
  margin-bottom: 22px;
`;

export const Title = styled(Text).attrs({
  bold: true,
})`
  font-size: ${fonts.sizes.medium};
  margin-bottom: 8px;
`;

export const Tag = styled.TouchableOpacity`
  align-self: flex-start;
  padding: 10px;
  align-items: center;
  background-color: ${colors.white};
  border-radius: 5px;
  margin-bottom: 16px;
  border-width: 1px;
  border-color: ${colors.red};
`;

export const TextTag = styled(Text).attrs({
  bold: true
})`
  font-size: ${fonts.sizes.small};
  color: ${colors.red};
`;

export const Description = styled(Text)`
  font-size: ${fonts.sizes.normal};
  color: ${colors.gray};
  line-height: ${fonts.lineHeights.normal};
  margin-bottom: 12px;
`;

export const Price = styled(Text)`
  font-size: ${fonts.sizes.medium};
  color: ${colors.green};
`;

export const ContainerPrice = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Footer = styled.View`
  padding: 12px 0 30px 0;
  background-color: ${colors.white};
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: ${colors.whiteDark};
`;

export const Add = styled.View`
  border-radius: 5px;
  margin-right: 12px;
  background-color: ${colors.whiteIce};
  width: 40%;
  flex-direction: row;
`;

export const ContainerIconLeft = styled.TouchableOpacity`
  align-items: flex-start;
  justify-content: center;
  padding: 16px 10px;
`;

export const ContainerIconRight = styled.TouchableOpacity`
  align-items: flex-end;
  justify-content: center;
  padding: 16px 10px;
`;

export const Quantity = styled.TextInput`
  flex: 1;
  font-size: ${fonts.sizes.normal};
  font-family: ${fonts.bold};
  color: ${colors.blue};
  text-align: center;
`;

export const ButtonAdd = styled.TouchableOpacity`
  flex: 1;
  border-radius: 5px;
  padding: 16px 20px;
  background-color: ${colors.blue};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextButtonAdd = styled(Text).attrs({
  bold: true,
})`
  font-size: ${fonts.sizes.normal};
  color: ${colors.yellow};
`;

export const ButtonRemove = styled.TouchableOpacity`
  padding: 16px 20px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${colors.red};
  background-color: ${colors.white};
  margin: 20px 0 20px 0;
  flex-direction: row;
`;

export const TextButtonRemove = styled(Text)`
  color: ${colors.red};
  font-size: ${fonts.sizes.normal};
`;


export const ContainerOpcao = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 0;
`;

export const OpcaoText = styled(Text)`
  font-size: ${fonts.sizes.normal};
  flex: 1;
  font-family: ${fonts.bold};
`;

export const ContainerAddOpcao = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ButtonAddOpcao = styled.TouchableOpacity`
  padding: 0 12px;
  background-color: ${colors.whiteIce};
  border-radius: 5px;
  opacity: ${({ disabled }) => disabled ? 0.3 : 1};
`;

export const TextButtonAddOpcao = styled(Text)`
  color: ${colors.blue};
  font-size: ${fonts.sizes.big};
  /* font-family: ${fonts.bold}; */
`;

export const TextQuantidadeOpcao = styled(Text)`
  font-size: ${fonts.sizes.medium};
  padding: 0 14px;
`;

export const InfoOpcao = styled(Text)`
  font-size: ${fonts.sizes.normal};
  color: ${colors.gray};
  /* padding: 0 10px; */
`;