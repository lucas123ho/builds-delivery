import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import PageCadastro from "@components/PageCadastro";
import { ApplicationState } from '@store/index';
import { UserAction } from '@store/ducks/user/types';
import { formataCPF } from '@utils/functions';
import { userAction } from "@root/utils/dispatch";

export default function Nome() {
  const cpf = useSelector((state: ApplicationState) => state.user.cpf)
  const [CPF, setCPF] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch<(action: UserAction) => void>();

  function handleNavigateToStepTwo() {
    dispatch(userAction({ cpf: CPF }));
    navigation.navigate("CadastrarTelefone");
  }

  useEffect(() => {
    setCPF(formataCPF(CPF || ''));
  }, [CPF]);

  useEffect(() => {
    setCPF(cpf);
  }, []);

  return (
    <PageCadastro
      title={{
        text: "Qual o seu",
        destaque: "CPF (Opcional)",
      }}
      input={{
        label: "CPF (Opcional)",
        info: "Pode ficar tranquilo, seu CPF estará seguro e, só será utilizazdo para fins fiscais.",
        onChangeText: setCPF,
        placeholder: "000.000.000-00",
        keyboardType: "numeric",
        maxLength: 14
      }}
      optional={true}
      value={CPF}
      condition={CPF?.length === 14}
      onSubmit={handleNavigateToStepTwo}
    />
  );
}
