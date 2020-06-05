import React from "react";
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import { ContainerButtons, Cancel } from './styles';
import ButtonBottom from '@components/ButtonBottom';
import colors from '@styles/colors';
import { ApplicationState } from "@root/store";
import { Types } from '@store/ducks/sale';

export default function ButtonFinalize() {
  const { items, total_com_frete } = useSelector((state: ApplicationState) => state.sale);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function handleCancelSale() {
    Alert.alert("Atenção!", "Deseja mesmo cancelar esta venda?", [
      {
        text: "Sim",
        onPress: () => {
          dispatch({
            type: Types.DELETE_SALE,
          });
        },
      },
      {
        text: "Não",
        onPress: () => {},
      },
    ]);
  }

  return (
    <>
      {JSON.stringify(items) !== "[]" && (
        <ContainerButtons>
          <Cancel onPress={handleCancelSale}>
            <AntDesign name="close" size={20} color={colors.white} />
          </Cancel>
          <ButtonBottom
            onPress={() => navigation.navigate("Finalizar")}
            active={true}
            text="Ir para o carrinho"
            total={total_com_frete}
          />
        </ContainerButtons>
      )}
    </>
  );
}
