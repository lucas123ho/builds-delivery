import React from "react";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import {
  Container,
  TabButton,
  TabText,
  ContainerCount,
  TextCount,
  ContainerIcon,
} from "./styles";
import colors from "@root/styles/colors";
import { ApplicationState } from "@root/store";

export default function MyTabBar({ state, descriptors, navigation, icons }) {
  const { pedidos_abertos } = useSelector(
    (state: ApplicationState) => state.pedidos
  );
  return (
    <Container
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabButton
            key={label}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ["selected"] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {(label === "Pedidos" && pedidos_abertos?.length > 0) && (
              <ContainerIcon>
                <ContainerCount>
                  <TextCount>{pedidos_abertos?.length}</TextCount>
                </ContainerCount>
              </ContainerIcon>
            )}

            <Feather
              name={icons?.[label]}
              size={27}
              color={colors.black}
              style={{
                marginBottom: 5,
              }}
            />
            <TabText active={isFocused}>{label}</TabText>
          </TabButton>
        );
      })}
    </Container>
  );
}
