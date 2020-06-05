import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CustomTabs from "@components/CustomTabs";
import Inicio from "@pages/Main/Inicio";
import Busca from "@pages/Main/Busca";
import Pedidos from "@pages/Main/Pedidos";
import Perfil from "@pages/Main/Perfil";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <CustomTabs
          {...props}
          icons={{
            Inicio: "home",
            Busca: "search",
            Pedidos: "file-text",
            Perfil: "user",
          }}
        />
      )}
    >
      <Tab.Screen name="Inicio" component={Inicio} />
      <Tab.Screen name="Busca" component={Busca} />
      <Tab.Screen name="Pedidos" component={Pedidos} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}
