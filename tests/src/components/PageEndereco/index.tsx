import React, { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import Geocoding from "react-geocoding";

import {
  Container,
  Content,
  Title,
  Destaque,
  ContainerLocation,
  TitleLocation,
  Header,
} from "./styles";
import Input from "@components/Input";
import colors from "@root/styles/colors";
import { getCEP, getNumber, verifyCoverByCEP } from "@utils/functions";
import Loading from "@components/Loading";
import { ApplicationState } from "@store/index";
import { Cliente } from "@root/types/db";
import api from "@root/services/api";
import { userAction } from "@root/utils/dispatch";

interface PageEnderecoProps {
  onSelectAddress: (
    cep: string,
    formatted_address: string,
    number: string,
    hasCover: {
      message: string;
      cobertura: boolean;
    },
    latitude?: number,
    longitude?: number
  ) => void;
}

export default function PageEndereco({ onSelectAddress }: PageEnderecoProps) {
  const { formatted_address, users_ids } = useSelector(
    (state: ApplicationState) => state.user
  );
  const [timer, setTimer] = useState<number>(0);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const [oldAddress, setOldAddress] = useState<Cliente[]>();
  const dispatch = useDispatch();

  async function handleSelectAddress(
    latitude: number,
    longitude: number,
    formatted_address
  ) {
    setLoading(true);
    const CEP = await getCEP(latitude, longitude);
    const number = await getNumber(latitude, longitude);
    const hasCover = await verifyCoverByCEP(CEP, latitude, longitude);
    dispatch(userAction({
      id: null
    }))
    setLoading(false);
    onSelectAddress(CEP, formatted_address, number, hasCover, latitude, longitude);
  }

  async function handleSelectOldAddress(address: Cliente) {
    setLoading(true);
    dispatch(userAction({
      id: address?.Id
    }));
    const formatted_address = `${address?.nmLogradouro}`;
    const hasCover = await verifyCoverByCEP(address?.nrCEP, address?.Latitude, address?.Longitude); // Criar campos no banco
    setLoading(false);
    onSelectAddress(address?.nrCEP, formatted_address, address?.nrNumero, hasCover);
  }

  function handlechangeAddress(text: string) {
    clearTimeout(timer);
    setValueInput(text);
    setLoadingLocations(true);
    setTimer(
      setTimeout(() => {
        setAddress(text);
        setLoadingLocations(false);
      }, 1000)
    );
  }

  useEffect(() => {
    async function getData() {
      if (users_ids.length) {
        const { data } = await api.get(`/clientes?q=${users_ids.join("|")}`);
        setOldAddress(data);
      }
    }
    getData();
  }, []);

  return (
    <Container>
      {loading && <Loading />}
      <Content keyboardShouldPersistTaps="always">
        <Header>
          <Title>
            Qual seu <Destaque>endereço</Destaque>?
          </Title>
          <Input
            label="Endereço"
            info="Ex.: Rua n, 179, Aruana"
            textContentType="fullStreetAddress"
            autoCorrect={false}
            style={{ marginBottom: 18 }}
            onChangeText={handlechangeAddress}
            onClean={() => handlechangeAddress("")}
            value={valueInput}
            autoFocus={true}
          />
        </Header>
        {loadingLocations ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator size={40} color={colors.blue} />
          </View>
        ) : address ? (
          <Geocoding
            apiKey="AIzaSyBkefhu96zvXtmvrcKgX3CniesdDDe3H28"
            address={address}
            region="br"
            onFinishRequest={() => {
              setLoadingLocations(false);
            }}
            renderItem={(location) => (
              <ContainerLocation
                onPress={async () => {
                  const { lat, lng } = location.geometry.location;
                  handleSelectAddress(lat, lng, location.formatted_address);
                }}
                key={location?.formatted_address}
              >
                <MaterialIcons
                  name="location-on"
                  size={30}
                  color={colors.whiteDark}
                />
                <TitleLocation>{location?.formatted_address}</TitleLocation>
              </ContainerLocation>
            )}
          />
        ) : (
          oldAddress?.map((address) => (
            <ContainerLocation
              onPress={async () => {
                handleSelectOldAddress(address);
              }}
              key={address?.nrNumero}
            >
              <MaterialIcons
                name="location-on"
                size={30}
                color={colors.whiteDark}
              />
              <TitleLocation>{`${address?.nmLogradouro}, ${address?.nrNumero}`}</TitleLocation>
            </ContainerLocation>
          ))
        )}
      </Content>
    </Container>
  );
}
