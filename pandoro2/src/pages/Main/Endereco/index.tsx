import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
"react-redux";
import { useDispatch } from "react-redux";

import PageEndereco from "@components/PageEndereco";
import { userAction } from "@root/utils/dispatch";
import ModalEndereco from "@root/components/ModalEndereco";

export default function Endereco({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { to } = route.params;

  async function handleSelectAddress(
    cep: string,
    address: string,
    number: string,
    hasCover,
    latitude,
    longitude
  ) {
    if (hasCover?.cobertura) {
      dispatch(
        userAction({
          id: null,
          cep,
          formatted_address: address,
          numero: number,
          latitude,
          longitude
        })
      );
      navigation.navigate("Complementos", { to });
    } else {
      setModalVisible(true);
    }
  }

  return (
    <>
      <ModalEndereco visible={modalVisible} onClose={() => setModalVisible(false)} />
      <PageEndereco onSelectAddress={handleSelectAddress} />
    </>
  );
}
