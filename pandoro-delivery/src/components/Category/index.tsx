import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Container, Avatar, Title, Image } from "./styles";
import colors from "@root/styles/colors";

interface CategoryProps extends TouchableOpacityProps {
  text?: string;
  image?: string;
}

export default function Category({ style, text, image, ...rest }: CategoryProps) {
  const defaultImage = ""
  return (
    <Container style={style} {...rest}>
      {(!!image || !!defaultImage) ? (
        <Image 
          source={{ uri: image || defaultImage }}
          resizeMode="cover"
        />
      ) : (
        <Avatar>
          <Feather name="layers" size={50} color={colors.lightGray} />
        </Avatar>
      )}

      <Title>{text}</Title>
    </Container>
  );
}
