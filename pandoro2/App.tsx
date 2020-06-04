import React, { useEffect, useState } from "react";
import { Vibration, Platform, KeyboardAvoidingView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

import Routes from "./src/routes";
import { store, persistor } from "./src/store";
import api from "@root/services/api";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Gilroy-regular": require("./src/assets/fonts/Manrope-Medium.ttf"),
        "Gilroy-bold": require("./src/assets/fonts/Manrope-ExtraBold.ttf"),
      });
      setFontLoaded(true);
    }
    async function push() {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = await Notifications.getExpoPushTokenAsync();
      await api.post("/push", { token });

      if (Platform.OS === "android") {
        Notifications.createChannelAndroidAsync("default", {
          name: "default",
          sound: true,
          priority: "max",
          vibrate: [0, 250, 250, 250],
        });
      }
    }
    push();
    loadFonts();

    Notifications.addListener((notification) => {
      Vibration.vibrate([0, 250, 250, 250], false);
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {fontLoaded && (
          <NavigationContainer>
            {Platform.OS === "ios" ? (
              <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                <Routes />
              </KeyboardAvoidingView>
            ) : (
              <Routes />
            )}
          </NavigationContainer>
        )}
      </PersistGate>
    </Provider>
  );
}
