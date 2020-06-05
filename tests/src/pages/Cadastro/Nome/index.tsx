import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import PageCadastro from "@components/PageCadastro";
import { ApplicationState } from '@store/index';
import { userAction } from "@utils/dispatch";

export default function Nome() {
  const nome = useSelector((state: ApplicationState) => state.user.nome);
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function handleNavigateToStepTwo() {
    dispatch(userAction({ nome: name }));
    navigation.navigate("CadastrarCPF");
  }

  useEffect(() => {
    setName(nome);
  }, []);

  return (
    <PageCadastro
      title={{
        text: "Qual o seu",
        destaque: "nome",
      }}
      input={{
        label: "Nome completo",
        info: "Essa informação será utilizada para identificar os seus pedidos",
        onChangeText: setName,
        autoCapitalize: "words",
        textContentType: "name"
      }}
      value={name}
      onSubmit={handleNavigateToStepTwo}
    />
  );
}
