import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import {
  BoasVindas,
  Nome,
  CPF,
  Telefone,
  Checkout,
  InfoLocalizacao,
  Endereco,
  Complementos,
  Finalized,
  VerificarTelefone
} from "@pages/Cadastro";

const Stack = createStackNavigator();

export default function RotasCadastro() {
  return (
    <Stack.Navigator
      initialRouteName="BoasVindas"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}
    >
      <Stack.Screen name="BoasVindas" component={BoasVindas} />
      <Stack.Screen name="CadastrarNome" component={Nome} />
      <Stack.Screen name="CadastrarCPF" component={CPF} />
      <Stack.Screen name="CadastrarTelefone" component={Telefone} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="InfoLocalizacao" component={InfoLocalizacao} />
      <Stack.Screen name="CadastrarEndereco" component={Endereco} />
      <Stack.Screen name="Complementos" component={Complementos} />
      <Stack.Screen name="Finalized" component={Finalized} />
      <Stack.Screen name="VerificarTelefone" component={VerificarTelefone} />
    </Stack.Navigator>
  );
}
