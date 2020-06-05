import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native';

import {
  Container,
  Title,
  ContainerButton,
  ContentButton,
  ContainerText,
  ContentText,
  Label,
  TextButton,
} from "./styles";
import { Content } from "@styles/components";
import TitlePage from "@components/TitlePage";
import Select from "@components/Select";
import colors from "@styles/colors";
import { ApplicationState } from "@root/store";
import { cut } from "@root/utils/functions";

export default function Perfil() {
  const {
    nome,
    telefone,
    cpf,
    numero,
    complemento,
    formatted_address: logradouro,
  } = useSelector((state: ApplicationState) => state.user);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <Content>
      <TitlePage title="Perfil" />
      <Container contentContainerStyle={{ paddingVertical: 24 }}>
        <Title>Dados pessoais</Title>
        <ContainerButton onPress={() => navigation.navigate("EditarDados")}>
          <ContentButton>
            <ContainerText>
              <ContentText>
                <Label>Nome:</Label>
                <TextButton>{nome}</TextButton>
              </ContentText>
              {!!cpf && (
                <ContentText style={{ marginBottom: 0 }}>
                  <Label>CPF:</Label>
                  <TextButton>{cpf}</TextButton>
                </ContentText>
              )}
            </ContainerText>
            <AntDesign name="right" size={20} color={colors.blue} />
          </ContentButton>
        </ContainerButton>
        <Select
          style={{ marginBottom: 40 }}
          title={telefone}
          subTitle="Clique para alterar"
          button={{
            onPress: () => navigation.navigate("EditarTelefone"),
          }}
        />
        <Title>Endereço</Title>
        <Select
          style={{ marginBottom: 0 }}
          title={cut(logradouro, 30, "...")}
          subTitle={
            `Número: ${numero}` + (complemento ? ` - ${complemento}` : "")
          }
          button={{
            onPress: () => navigation.navigate("PageEndereco", { to: "Tabs" }),
          }}
        />
      </Container>
    </Content>
    </SafeAreaView>
  );
}
