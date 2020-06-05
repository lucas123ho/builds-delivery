import React, { useState, useEffect } from 'react';

import { Container, Content, Title, Destaque } from './styles';
import Input from '../Input';
import ButtonBottom from '../ButtonBottom';
import { PageCadastroProps } from './types';

export default function PageCadastro({
  title,
  input,
  value,
  onSubmit,
  optional = false,
  condition = true
}: PageCadastroProps) {
  const [buttonActive, setButtonActive] = useState(false);

  useEffect(() => {
    if(optional) {
      if(value) {
        setButtonActive(!!value && condition);
      } else {
        setButtonActive(true);
      }
    } else {
      setButtonActive(!!value && condition);
    }
  }, [value]);

  return (
    <Container>
      <Content>
        <Title>{title?.text} <Destaque>{title?.destaque}</Destaque>?</Title>
        <Input 
          {...input}
          value={value}
          autoFocus={true}
        />
      </Content>
      <ButtonBottom 
        active={buttonActive}
        onPress={onSubmit}
      />
    </Container>
  );
}
