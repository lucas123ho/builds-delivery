import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import PageCadastro from "@components/PageCadastro";
import { ApplicationState } from '@store/index';
import { formatTel } from "@root/utils/functions";
import { userAction } from "@root/utils/dispatch";

export default function Telefone() {
  const telefone = useSelector((state: ApplicationState) => state.user.telefone);
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function handleNavigateToStepThree() {
    dispatch(userAction({ telefone: phone }))
    navigation.navigate("VerificarTelefone");
  }

  useEffect(() => {
    setPhone(formatTel(phone || ''));
  }, [phone]);

  useEffect(() => {
    setPhone(telefone);
  }, [])

  return (
    <PageCadastro
      title={{
        text: "E o seu",
        destaque: "telefone",
      }}
      input={{
        label: "Número de telefone",
        info: "O telefone é importante para que possamos entrar em contato caso ocorra algum imprevisto.",
        onChangeText: setPhone,
        keyboardType: "phone-pad",
        placeholder: "(00) 0 0000-0000",
        maxLength: 15
      }}
      value={phone}
      onSubmit={handleNavigateToStepThree}
      condition={phone?.length === 15}
    />
  );
}
