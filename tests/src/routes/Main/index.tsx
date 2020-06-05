import React, { useEffect, useState, useCallback } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import * as Network from "expo-network";
import { useDispatch, useSelector } from "react-redux";

import Tabs from "./Tabs";
import Grupo from "@root/pages/Main/Grupo";
import SubGrupo from "@root/pages/Main/SubGrupo";
import Produto from "@pages/Main/Produto";
import Finalizar from "@pages/Main/Finalizar";
import Endereco from "@pages/Main/Endereco";
import PageEndereco from "@pages/Main/PageEndereco";
import Complemento from "@pages/Main/Endereco/Complemento";
import FormasPagamento from "@pages/Main/FormasPagamento";
import EnviarVenda from "@pages/Main/EnviarVenda";
import PedidoEnviado from "@pages/Main/PedidoEnviado";
import Acompanhamento from "@pages/Main/Acompanhamento";
import EditarDados from "@pages/Main/EditarDados";
import VerificarTelefone from "@pages/Main/VerificarTelefone";
import EditarTelefone from "@pages/Main/EditarTelefone";

import {
  getGrupos,
  getGruposWithProdutos,
  getCombos,
  getPedidos,
} from "@root/utils/functions";
import {
  setGrupos,
  setPedidos,
  routeAction,
  configAction,
} from "@root/utils/dispatch";
import { ApplicationState } from "@root/store";
import api from "@root/services/api";
import { ConfigState } from "@root/store/ducks/config/types";

const Stack = createStackNavigator();

export default function MainRoutes() {
  const [timer, setTimer] = useState<number>(0);
  const dispatch = useDispatch();
  const { enviando_pedido, users_ids } = useSelector(
    (state: ApplicationState) => ({
      ...state.route,
      ...state.user,
    })
  );

  useEffect(() => {
    async function getData() {
      const networkStatus = await Network.getNetworkStateAsync();
      if (networkStatus.isConnected) {
        const grupos = await getGrupos();
        const gruposWithProdutos = await getGruposWithProdutos();
        const combos = await getCombos();
        const { data: configs } = await api.get("/configuracao");
        dispatch(configAction(configs));
        dispatch(
          setGrupos({
            items: grupos,
            withProdutos: gruposWithProdutos,
            combos,
          })
        );
      }
    }
    async function getStatus() {
      const networkStatus = await Network.getNetworkStateAsync();
      if (networkStatus.isConnected) {
        const pedidos = await getPedidos(users_ids);
        dispatch(setPedidos(pedidos));
        if (pedidos.pedidos_abertos.length === 0) {
          dispatch(
            routeAction({
              pedido_aberto: false,
            })
          );
        } else {
          dispatch(
            routeAction({
              pedido_aberto: true,
            })
          );
        }
      }
    }
    getStatus();
    getData();
    clearInterval(timer);
    setTimer(setInterval(getData, 60000));
  }, []);

  if (enviando_pedido) {
    return (
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
        }}
      >
        <Stack.Screen name="EnviarVenda" component={EnviarVenda} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerShown: false,
        }}
      >
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Grupo" component={Grupo} />
        <Stack.Screen name="SubGrupo" component={SubGrupo} />
        <Stack.Screen name="Produto" component={Produto} />
        <Stack.Screen name="Finalizar" component={Finalizar} />
        <Stack.Screen name="PageEndereco" component={PageEndereco} />
        <Stack.Screen name="Endereco" component={Endereco} />
        <Stack.Screen name="Complementos" component={Complemento} />
        <Stack.Screen name="FormasPagamento" component={FormasPagamento} />
        <Stack.Screen name="PedidoEnviado" component={PedidoEnviado} />
        <Stack.Screen name="Acompanhamento" component={Acompanhamento} />
        <Stack.Screen name="EditarDados" component={EditarDados} />
        <Stack.Screen name="VerificarTelefone" component={VerificarTelefone} />
        <Stack.Screen name="EditarTelefone" component={EditarTelefone} />
      </Stack.Navigator>
    );
  }
}
