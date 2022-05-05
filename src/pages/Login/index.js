import React from 'react';
import { Title, Paragrafo } from './styled';
import { Container } from '../../styles/GlobalStyles';

function Login() {
  return (
    <Container>
      <Title>
        Login
        <small>Oiee</small>
      </Title>
      <Paragrafo>Lorem ipsum dolor sit amet.</Paragrafo>
      <a href="">Link</a>
      <button type="button">Enviar</button>
    </Container>
  );
}

export default Login;
