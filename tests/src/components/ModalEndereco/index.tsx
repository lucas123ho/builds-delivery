import React from "react";
import { Modal, Image } from "react-native";

import { Container, Content, Title, SubTitle, Background } from "./styles";
import SadImage from "@assets/images/sad.png";
import { Button, TextButton } from "@styles/components";

interface ModalEnderecoProps {
  visible: boolean;
  onClose: () => void;
}

export default function ModalEndereco({ visible = true, onClose }: ModalEnderecoProps) {
  return (
    <Modal visible={visible} transparent={true} animated={true} animationType="fade">
      <Container>
        <Background onPress={onClose} activeOpacity={0.9} />
        <Content>
          <Image
            style={{ width: 150, height: 100, marginBottom: 16 }}
            source={SadImage}
            resizeMode="contain"
          />
          <Title>Ainda não atendemos em sua região.</Title>
          <SubTitle>
            Por favor, tente de novo após alguns dias ou entre em contato
            conosco.
          </SubTitle>
          <Button onPress={onClose}>
            <TextButton>Voltar</TextButton>
          </Button>
        </Content>
      </Container>
    </Modal>
  );
}
