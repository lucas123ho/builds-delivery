import React from "react";
import { useNavigation } from '@react-navigation/native';

import PageInfo from "@components/PageInfo";
import imageMoto from "@assets/images/moto.png";

export default function BoasVindas() {
  const navigation = useNavigation();

  function handleNavigateToRegister() {
    navigation.navigate("CadastrarNome");
  }
  return (
    <PageInfo
      image={{
        width: 412,
        height: 304,
        source: imageMoto
      }}
      title="Seja Bem-vindo(a)"
      text="Para que possamos lhe atender da melhor forma, precisaremos te perguntar algumas coisas. Pode ficar tranquilo, é bem rápido."
      button={{
        text: "Ok, prosseguir",
        onPress: handleNavigateToRegister
      }}
    />
  );
}
