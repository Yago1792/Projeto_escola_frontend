import React from 'react';
import { useDispatch } from 'react-redux';

import { Title, Paragrafo } from './styled';
import { Container } from '../../styles/GlobalStyles';
import * as exampleActions from '../../store/module/example/actions';

// import axios from '../../services/axios';

function Login() {
  // React.useEffect(() => {
  //   // o useEffects se parece com o componentDidMount, isso é, quando um componente eh montado, ele executa a funcao que passamos pra ele e pronto, nao faz mais nada.
  //   // console.log('oi');
  //   async function getData() {
  //     await axios.get('/alunos');
  //   }
  //   getData();
  // }, []);

  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(
      // Disparador de açoes. nesse, disparada uma acao chamada BOTAO_CLICADO
      exampleActions.clicaBotaoRequest()
    );
  }

  return (
    <Container>
      <Title>Titulo</Title>
      <Paragrafo>Lorem ipsum dolor sit amet.</Paragrafo>
      <a href="" style={{ display: 'block' }}>
        Link
      </a>
      <button type="button" onClick={handleClick}>
        Enviar
      </button>
    </Container>
  );
}

export default Login;
