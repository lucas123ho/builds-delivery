import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { useSelector } from 'react-redux';

import RotasCadastro from "./RotasCadastro";
import Main from "./Main";
import { ApplicationState } from '@store/index';

const Stack = createStackNavigator();

export default function Routes() {
  const { registred } = useSelector((state: ApplicationState) => state.route);
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false
      }}
    >
      {registred ? (
        <Stack.Screen name="Main" component={Main} />
      ) : (
        <Stack.Screen name="Cadastro" component={RotasCadastro} />
      )}
    </Stack.Navigator>
  );
}
