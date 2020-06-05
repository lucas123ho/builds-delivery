import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { Container, ButtonBack, HeaderInput as Input } from "./styles";
import colors from "@styles/colors";
import { HeaderInputProps } from "./types";

export default function HeaderInput({
  onBack,
  search,
  setSearch,
  ...rest
}: HeaderInputProps) {
  return (
    <Container
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 2,
        zIndex: 10,
        ...Object(rest?.style)
      }}
    >
      <ButtonBack onPress={onBack}>
        <MaterialIcons name="arrow-back" size={24} color={colors.black} />
      </ButtonBack>
      <Input
        placeholder="Buscar..."
        autoFocus={true}
        autoCapitalize="none"
        onChangeText={setSearch}
        value={search}
        autoCorrect={false}
      />
    </Container>
  );
}
