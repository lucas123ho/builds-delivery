import React from "react";
import { Modal, Image } from "react-native";

import { Container, Content, Title, SubTitle, Background } from "./styles";
import { Button, TextButton } from "@styles/components";

interface ModalEnderecoProps {
  visible: boolean;
  onClose: () => void;
  image?: any;
  title: string;
  subTitle?: string;
  textButton?: string;
}

export default function ModalEndereco({
  visible = true,
  onClose,
  image,
  title,
  subTitle,
  textButton = "Voltar",
}: ModalEnderecoProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animated={true}
      animationType="fade"
    >
      <Container>
        <Background onPress={onClose} activeOpacity={0.9} />
        <Content>
          {image && (
            <Image
              style={{ width: 150, height: 100, marginBottom: 16 }}
              source={image}
              resizeMode="contain"
            />
          )}
          <Title>{title}</Title>
          <SubTitle>{subTitle} </SubTitle>
          <Button onPress={onClose}>
            <TextButton>{textButton}</TextButton>
          </Button>
        </Content>
      </Container>
    </Modal>
  );
}
