import React, { useState, useEffect } from "react";
import { Animated } from "react-native";

import { Container, Image, Title, TextInfo, Content, Padding } from "./styles";
import { Button, TextButton } from "@styles/components";
import { PageInfoProps } from "./types";
import colors from "@root/styles/colors";

export default function PageInfo({
  image,
  title,
  text = "",
  button,
  button2,
  animationTime = 1000,
}: PageInfoProps) {
  const [buttonAnimateOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(buttonAnimateOpacity, {
        toValue: 1,
      }).start();
    }, animationTime);
  }, []);

  return (
    <Container>
      <Content>
        <Image
          source={image?.source}
          width={image?.width}
          height={image?.height}
          resizeMode="contain"
        />
        <Padding>
          <Title>{title}</Title>
          <TextInfo>{text}</TextInfo>
          <Animated.View style={{ opacity: buttonAnimateOpacity }}>
            {button && (
              <Button onPress={button.onPress}>
                <TextButton>{button.text}</TextButton>
              </Button>
            )}
            {button2 && (
              <Button
                style={{ marginTop: 16, backgroundColor: colors.whiteIce }}
                onPress={button2.onPress}
              >
                <TextButton style={{ color: colors.blue }}>
                  {button2.text}
                </TextButton>
              </Button>
            )}
          </Animated.View>
        </Padding>
      </Content>
    </Container>
  );
}
