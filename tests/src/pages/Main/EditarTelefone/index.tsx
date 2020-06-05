import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import PageCadastro from "@components/PageCadastro";
import { ApplicationState } from '@store/index';
import { formatTel } from "@root/utils/functions";

export default function Telefone() {
  const telefone = useSelector((state: ApplicationState) => state.user.telefone);
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();

  function handleNavigateToStepThree() {
    navigation.navigate("VerificarTelefone", { telefone: phone });
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
        text: "Qual o novo",
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
