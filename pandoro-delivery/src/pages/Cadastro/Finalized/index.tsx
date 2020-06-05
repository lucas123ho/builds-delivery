import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import PageInfo from "@components/PageInfo";
import imageCheck from "@assets/images/check.png";
import { routeAction } from "@utils/dispatch";

export default function Finalized() {
  const dispatch = useDispatch();
  const navigateToHome = useCallback(() => {
    dispatch(routeAction({ registred: true }));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      navigateToHome();
    }, 3000);
  }, [navigateToHome]);

  function handleNavigateToRegister() {
    navigateToHome();
  }
  return (
    <PageInfo
      image={{
        width: 200,
        height: 200,
        source: imageCheck,
      }}
      animationTime={1000}
      title="Pronto!"
      text="Agora seu app está configurado para recceber entregas."
      button={{
        text: "Começar a comprar",
        onPress: handleNavigateToRegister,
      }}
    />
  );
}
