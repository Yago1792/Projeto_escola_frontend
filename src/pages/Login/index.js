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
      // Disparador de açoes.
      exampleActions.clicaBotaoRequest()
    );
  }

  return (
    <Container>
      <Title>Header</Title>
      <Paragrafo>Lorem ipsum dolor sit amet.</Paragrafo>
      <button type="button" onClick={handleClick}>
        Click to change the status!
      </button>
    </Container>
  );
}

export default Login;
