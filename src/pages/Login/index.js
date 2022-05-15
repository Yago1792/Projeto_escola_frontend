import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { Link } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
// import history from '../../services/history';
import * as actions from '../../store/module/auth/actions';
import Loading from '../../components/Loading';

function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/'); // Entender

  const isLoading = useSelector((state) => {
    return state.auth.isLoading;
  });

  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail invalido');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha inválida');
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath, isLoggedIn }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Faça login</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu email"
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>

        <button type="submit">Fazer login</button>
      </Form>

      <Link to="/register">
        <button type="submit" style={{ marginTop: 20, width: '100%' }}>
          Criar nova conta
        </button>
      </Link>
    </Container>
  );
}

export default Login;
