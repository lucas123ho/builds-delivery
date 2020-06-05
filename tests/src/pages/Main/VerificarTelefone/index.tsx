import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { Title, CodeInput, Container, Info } from "./styles";
import { Content } from "@styles/components";
import colors from "@root/styles/colors";
import ButtonBottom from "@root/components/ButtonBottom";
import { ApplicationState } from "@root/store";
import api from "@root/services/api";
import { routeAction, userAction } from "@root/utils/dispatch";
import Loading from "@root/components/Loading";
import Modal from '@components/Modal';
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerificarTelefone({ route }) {
  const { telefone } = route.params;
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);
  const [number1, setNumber1] = useState<number>(null);
  const [number2, setNumber2] = useState<number>(null);
  const [number3, setNumber3] = useState<number>(null);
  const [number4, setNumber4] = useState<number>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const { data_envio_sms, users_ids } = useSelector(
    (state: ApplicationState) => ({
      ...state.route,
      ...state.user,
    })
  );
  const dispatch = useDispatch();
  const telefoneClean = telefone
    .replace(/ /g, "")
    .replace("-", "")
    .replace("(", "")
    .replace(")", "");
  const navigation = useNavigation();

  useEffect(() => {
    async function sendSMSCOde() {
      const now = new Date().getTime();

      if ((now - data_envio_sms) / 1000 >= 180 || data_envio_sms === null) {
        setLoading(true);
        const { data: enviado } = await api.post("/telefone", {
          telefone: telefoneClean,
        });
        setLoading(false);
        if (enviado.status === 200) {
          dispatch(
            routeAction({
              data_envio_sms: new Date().getTime(),
            })
          );
        }
      } else {
        setLoading(false);
      }
    }
    sendSMSCOde();
  }, []);

  async function validateNumber() {
    const code = `${number1}${number2}${number3}${number4}`;
    setLoading(true);
    const { data: validacao } = await api.post("/verificarTelefone", {
      telefone: telefoneClean,
      codigo: code,
    });
    setLoading(false);
    if (validacao.valido === true) {
      dispatch(
        userAction({
          users_ids: [...validacao?.users, ...users_ids],
          telefone,
          id: null
        })
      );
      navigation.navigate("Tabs");
    } else {
      setModalVisible(true);
    }
  }

  useEffect(() => {
    if (!!number1 || number1 === 0) {
      input2.current.focus();
    }
  }, [number1]);

  useEffect(() => {
    if (!!number2 || number2 === 0) {
      input3.current.focus();
    } else {
      input1.current.focus();
    }
  }, [number2]);

  useEffect(() => {
    if (!!number3 || number3 === 0) {
      input4.current.focus();
    } else {
      input2.current.focus();
    }
  }, [number3]);

  useEffect(() => {
    if (!number4 && number4 !== 0) {
      input3.current.focus();
    }
  }, [number4]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading && <Loading />}
      <Content>
        <Title>Digite o código que foi enviado por SMS</Title>
        <Info>
          O código de verificação pode demorar alguns segundos para chegar em
          sua caixa de menssagens.
        </Info>
        <Container>
          <CodeInput
            placeholder="0"
            placeholderTextColor={colors?.lightGray}
            keyboardType="numeric"
            onChangeText={(text) => setNumber1(!!text ? Number(text) : null)}
            autoFocus={true}
            ref={input1}
            maxLength={1}
          />
          <CodeInput
            placeholder="0"
            placeholderTextColor={colors?.lightGray}
            keyboardType="numeric"
            ref={input2}
            onChangeText={(text) => setNumber2(!!text ? Number(text) : null)}
            maxLength={1}
          />
          <CodeInput
            placeholder="0"
            placeholderTextColor={colors?.lightGray}
            keyboardType="numeric"
            ref={input3}
            onChangeText={(text) => setNumber3(!!text ? Number(text) : null)}
            maxLength={1}
          />
          <CodeInput
            placeholder="0"
            placeholderTextColor={colors?.lightGray}
            keyboardType="numeric"
            ref={input4}
            onChangeText={(text) => setNumber4(!!text ? Number(text) : null)}
            maxLength={1}
          />
        </Container>
      </Content>
      <ButtonBottom
        text="Validar código"
        onPress={validateNumber}
        active={
          (!!number1 || number1 === 0) &&
          (!!number2 || number2 === 0) &&
          (!!number3 || number3 === 0) &&
          (!!number4 || number4 === 0)
        }
      />
      <Modal
        visible={modalVisible}
        title="Código de verificação inválido"
        subTitle="Verifique se digitou o código corretamente"
        onClose={() => {
          setModalVisible(false);
        }}
        image={{
          uri:
            "https://cdn.pixabay.com/photo/2017/03/28/01/42/attention-2180765_960_720.png",
        }}
        textButton="Voltar"
      />
    </SafeAreaView>
  );
};
