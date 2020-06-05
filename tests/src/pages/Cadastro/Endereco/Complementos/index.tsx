import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import geolocation from "geolocation-google-maps";

import {
  Container,
  Content,
  Address,
  Header,
  ContainerAddress,
} from "./styles";
import { ApplicationState } from "@store/index";
import colors from "@root/styles/colors";
import Input from "@components/Input";
import TitlePage from "@components/TitlePage";
import ButtonBottom from "@components/ButtonBottom";
import { userAction } from "@root/utils/dispatch";
import { verifyCoverByCEP } from "@root/utils/functions";
import ModalEndereco from "@root/components/ModalEndereco";

export default function Complementos() {
  const {
    formatted_address,
    numero: numeroRedux,
    complemento: complementoRedux,
    cep,
  } = useSelector((state: ApplicationState) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [numero, setNumero] = useState(numeroRedux);
  const [complemento, setComplemento] = useState(complementoRedux);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log(cep);
  }, []);

  function handleChangeNumber(text: string) {
    setNumero(text);
    dispatch(
      userAction({
        numero: text,
      })
    );
  }

  function handleChangeComplemento(text: string) {
    setComplemento(text);
    dispatch(
      userAction({
        complemento: text,
      })
    );
  }

  async function handleFinalize() {
    let postalCode = "";
    setLoading(true);
    const [result] = await geolocation({
      key: "AIzaSyBkefhu96zvXtmvrcKgX3CniesdDDe3H28",
      address: `${formatted_address} ${numero}`,
    });
    result.address_components.forEach((component) => {
      if (!postalCode) {
        const isPostalCode = component.types.indexOf("postal_code") !== -1;
        if (isPostalCode) {
          const isCompletPostalCode = component.long_name.indexOf("-") !== -1;
          if (isCompletPostalCode) {
            postalCode = component.long_name;
          }
        }
      } else {
        return;
      }
    });
    const cep = postalCode.split("-").join("");
    const hasCover = await verifyCoverByCEP(
      cep,
      result?.geometry?.location?.lat,
      result?.geometry?.location?.lng
    );
    if (hasCover) {
      dispatch(
        userAction({
          cep,
          formatted_address: result.formatted_address,
          numero,
        })
      );
      navigation.navigate("Finalized");
    } else {
      setModalVisible(true);
    }
    setLoading(false);
    // navigation.navigate("Finalized")
  }
  return (
    <>
      <Container>
        <Content>
          <TitlePage title="Informações adicionais" />
          <Header onPress={() => navigation.navigate("CadastrarEndereco")}>
            <ContainerAddress>
              <MaterialIcons
                name="location-on"
                size={30}
                color={colors.whiteDark}
              />
              <Address>{formatted_address}</Address>
            </ContainerAddress>
          </Header>
          <Input
            label="Número"
            value={numero}
            info="Ex.: 179"
            style={{ marginBottom: 36 }}
            onChangeText={handleChangeNumber}
            onClean={() => handleChangeNumber("")}
            keyboardType="numeric"
          />
          <Input
            label="Complemento (Opcional)"
            info="Bloco / Apto / Condomínio"
            value={complemento}
            onChangeText={handleChangeComplemento}
            onClean={() => handleChangeComplemento("")}
          />
        </Content>
        <ButtonBottom
          text={loading ? "Carregando..." : "Pronto!"}
          active={!!numero}
          onPress={handleFinalize}
        />
      </Container>
      <ModalEndereco
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}
