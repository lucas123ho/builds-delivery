import React, { useEffect, useState } from "react";
import { Alert, Image, RefreshControl } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  Content,
  Header,
  ContainerAddress,
  Logo,
  ContainerButtons,
  Cancel,
} from "./styles";
import { ApplicationState } from "@store/index";
import ButtonBottom from "@components/ButtonBottom";
import imageLogo from "@assets/images/logo.png";
import colors from "@root/styles/colors";
import { Types } from "@store/ducks/sale";
import api from "@root/services/api";

export default function Layout({
  children,
  address = true,
  onPressButtonBottom = () => {},
  textButtonBottom = "Ir para o carrinho",
  center = true,
  totalButtonBottom = 0,
  buttonActive = true,
  refresh = { onRefresh: null, refreshing: false },
  ...rest
}) {
  const { items, total, total_com_frete } = useSelector(
    (state: ApplicationState) => state.sale
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [banner, setBanner] = useState("");

  useEffect(() => {
    async function getLoja() {
      const { data: loja } = await api.get("/loja");
      setBanner(loja?.url_banner);
      // setBanner("https://media.gazetadopovo.com.br/bomgourmet/2018/11/doce-italiano-pandoro-83bd2190.jpg");
    }
    getLoja();
  }, []);

  function handleCancelSale() {
    Alert.alert("Atenção!", "Deseja mesmo cancelar este pedido?", [
      {
        text: "Sim",
        onPress: () => {
          dispatch({
            type: Types.DELETE_SALE,
          });
          navigation.navigate("Inicio");
        },
      },
      {
        text: "Não",
        onPress: () => {},
      },
    ]);
  }

  return (
    <Container>
      <Content
        contentContainerStyle={{ paddingBottom: 60 }}
        address={address}
        keyboardShouldPersistTaps="always"
        refreshControl={<RefreshControl refreshing={refresh.refreshing} onRefresh={refresh.onRefresh} />}
        {...rest}
      >
        {address &&
          (!banner ? (
            <Header>
              <ContainerAddress>
                <Logo source={imageLogo} resizeMode="contain" />
              </ContainerAddress>
            </Header>
          ) : (
            <Image
              source={{ uri: banner }}
              style={{ height: 200, alignSelf: "stretch", marginBottom: 33 }}
              resizeMode="cover"
            />
          ))}
        {children}
      </Content>
      {JSON.stringify(items) !== "[]" && (
        <ContainerButtons>
          <Cancel onPress={handleCancelSale}>
            <AntDesign name="close" size={20} color={colors.white} />
          </Cancel>
          <ButtonBottom
            onPress={onPressButtonBottom}
            active={buttonActive}
            text={textButtonBottom}
            total={center ? null : total_com_frete}
          />
        </ContainerButtons>
      )}
    </Container>
  );
}
