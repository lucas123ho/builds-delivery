import React from "react";
import { useNavigation } from '@react-navigation/native';

import PageInfo from "@components/PageInfo";
import imageCheck from "@assets/images/check.png";

export default function PedidoEnviado() {
  const navigation = useNavigation();
  return (
    <PageInfo
      image={{
        width: 200,
        height: 200,
        source: imageCheck,
      }}
      animationTime={1000}
      title="Seu pedido foi enviado!"
      text="Recebemos seu pedido e em breve traremos mais notícias."
      button={{
        text: "Acompanhar Pedido",
        onPress: () => navigation.navigate("Acompanhamento"),
      }}
    />
  );
}
