import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native';

import { Container } from "./styles";
import { Content } from "@styles/components";
import TitlePage from "@components/TitlePage";
import ButtonBottom from "@root/components/ButtonBottom";
import Input from "@root/components/Input";
import { ApplicationState } from "@root/store";
import { userAction } from "@root/utils/dispatch";
import { formataCPF, formatTel } from "@root/utils/functions";

export default function EditarDados() {
  const { nome: n, cpf: c } = useSelector(
    (state: ApplicationState) => state.user
  );
  const [nome, setNome] = useState(n);
  const [cpf, setCpf] = useState(c);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    setCpf(formataCPF(cpf || ''));
  }, [cpf]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Content>
        <TitlePage title="Editar dados" />
        <Container contentContainerStyle={{ paddingVertical: 24 }}>
          <Input
            label="Nome"
            style={{ marginBottom: 24 }}
            onChangeText={setNome}
            value={nome}
            autoCapitalize="words"
          />
          <Input label="CPF" value={cpf} onChangeText={setCpf} keyboardType="numeric" />
        </Container>
      </Content>
      <ButtonBottom
        text="Editar"
        active={
          nome &&
          (cpf ? cpf.length === 14 : true)
        }
        onPress={() => {
          dispatch(userAction({
            nome,
            cpf
          }));
          navigation.navigate("Tabs");
        }}
      />
    </SafeAreaView>
  );
}
