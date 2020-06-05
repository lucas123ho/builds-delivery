import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import * as Location from "expo-location";
import geolocation from "geolocation-google-maps";

import PageInfo from "@components/PageInfo";
import imageLocalizacao from "@assets/images/localizacao.png";
import { getCEP, getNumber, verifyCoverByCEP } from "@root/utils/functions";
import { userAction } from "@root/utils/dispatch";
import Loading from "@root/components/Loading";
import ModalEndereco from "@root/components/ModalEndereco";

export default function PageEndereco({ route }) {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { to } = route.params;

  function handleNavigateToRegister() {
    navigation.navigate("Endereco", { to });
  }

  async function handleGetCurrentLocation() {
    const { status } = await Location.requestPermissionsAsync();

    if (status !== "granted") {
    
    }

    setLoading(true);
    const location = await Location.getCurrentPositionAsync({});

    const latitude = location?.coords?.latitude;
    const longitude = location?.coords?.longitude;
    const address = `${latitude},${longitude}`;
    const [{ formatted_address }] = await geolocation({
      key: "AIzaSyBkefhu96zvXtmvrcKgX3CniesdDDe3H28",
      address,
    });
    const cep = await getCEP(latitude, longitude);
    const hasCover = await verifyCoverByCEP(cep, latitude, longitude);
    setLoading(false);
    if(hasCover.cobertura) {
      dispatch(
        userAction({
          formatted_address,
          cep,
        })
      );
      navigation.navigate("Complementos", { to });
    } else {
      setModalVisible(true);
    }
    
    // setLocation(location);
  }

  return (
    <>
      {loading && <Loading />}
      <ModalEndereco visible={modalVisible} onClose={() => setModalVisible(false)} />
      <PageInfo
        image={{
          width: 200,
          height: 200,
          source: imageLocalizacao,
        }}
        title="Mudar endereço"
        text="Selecione uma das opções abaixo para mudar o endereço da entrega."
        button={{
          text: "Usar localização atual",
          onPress: handleGetCurrentLocation,
        }}
        button2={{
          text: "Informar endereço",
          onPress: handleNavigateToRegister,
        }}
      />
    </>
  );
}
