import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';

import { Container, Content, Title } from "./styles";
import { ApplicationState } from "@store/index";
import Input from "@components/Input";
import { UserState } from "@store/ducks/user/types";
import { userAction } from "@utils/dispatch";
import ButtonBottom from '@components/ButtonBottom';

export default function Checkout() {
  const user = useSelector((state: ApplicationState) => state.user);
  const [nome, setNome] = useState(user?.nome);
  const [cpf, setCPF] = useState(user?.cpf);
  // const [telefone, setTelefone] = useState(user?.telefone);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function handleChangeData(props: UserState) {
    dispatch(userAction(props));
  }

  function handleNavigateToRegisterLocation() {
    navigation.navigate("InfoLocalizacao");
  }

  return (
    <Container>
      <Content>
        <Title>Seus dados estão corretos?</Title>
        <Input
          label="Nome completo"
          value={nome}
          onChangeText={(text) => {
            handleChangeData({ nome: text });
            setNome(text);
          }}
          style={{
            marginBottom: 32
          }}
          info="Clique acima para editar"
        />
        {!!cpf && (
          <Input
            label="CPF"
            value={cpf}
            style={{
              marginBottom: 32
            }}
            onChangeText={(text) => {
              handleChangeData({ cpf: text });
              setCPF(text);
            }}
            info="Clique acima para editar"
          />
        )}
        {/* <Input
          label="Telefone"
          value={telefone}
          style={{
            marginBottom: 32
          }}
          onChangeText={(text) => {
            handleChangeData({ telefone: text });
            setTelefone(text);
          }}
          info="Clique acima para editar"
        /> */}
      </Content>
      <ButtonBottom 
        text="Tudo certo, continuar"
        active={true}
        onPress={handleNavigateToRegisterLocation}
      />
    </Container>
  );
}
