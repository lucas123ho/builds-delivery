import React, { useRef, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import {
  Title,
  CodeInput,
  Container,
  Info,
  ContainerResend,
  Timer,
} from "./styles";
import { Content } from "@styles/components";
import colors from "@root/styles/colors";
import ButtonBottom from "@root/components/ButtonBottom";
import { ApplicationState } from "@root/store";
import api from "@root/services/api";
import { routeAction, userAction } from "@root/utils/dispatch";
import Loading from "@root/components/Loading";
import Modal from "@components/Modal";
import { SafeAreaView } from "react-native";

const VerificarTelefone: React.FC = () => {
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
  const [enviado, setEnviado] = useState(true);
  const { data_envio_sms, telefone } = useSelector(
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
  const sendSMSCode = useCallback(async () => {
      const now = new Date().getTime();
      if ((now - data_envio_sms) / 1000 >= 20 || data_envio_sms === null) {
        setLoading(true);
        const { data: enviado } = await api.post("/telefone", {
          telefone: telefoneClean,
        });
        setLoading(false);
        setEnviado(true);
        setTimeout(() => {
          setEnviado(false);
        }, 20000);
        if (enviado.status === 200) {
          dispatch(
            routeAction({
              data_envio_sms: new Date().getTime(),
            })
          );
        } else {
          setEnviado(false);
        }
      } else {
        setLoading(false);
      }
  }, [])

  useEffect(() => {
    sendSMSCode();
  }, [sendSMSCode]);



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
          users_ids: validacao?.users,
        })
      );
      navigation.navigate("Checkout");
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
        {enviado === false && (
          <ContainerResend onPress={sendSMSCode}>
            <Timer>Reenviar código</Timer>
          </ContainerResend>
        )}
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

export default VerificarTelefone;
