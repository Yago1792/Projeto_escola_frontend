import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Container } from '../../styles/GlobalStyles';
import { Button, Div, Paragrafo, Atencao, Form } from './styled';
import axios from '../../services/axios';
import Loading from '../../components/Loading';
import * as actions from '../../store/module/auth/actions';
import history from '../../services/history';

export default function Settings() {
  const dispatch = useDispatch();

  const [confirmation, setConfirmation] = useState('');

  const userId = useSelector((state) => state.auth.user.id);
  let isLoading = useSelector((state) => state.auth.isLoading);

  async function handleClickAsk(e) {
    e.preventDefault();

    const input = e.currentTarget.nextSibling;

    input.setAttribute('style', 'display: block');
    e.currentTarget.setAttribute('style', 'display: none');
  }

  async function handleClick(e) {
    e.preventDefault();

    if (confirmation.toLowerCase() === 'deletar') {
      try {
        isLoading = true;
        const response = await axios.delete(`/users/delete/${userId}`);
        isLoading = false;
        toast.success(response.data);
        dispatch(actions.loginFailure());
      } catch (err) {
        console.log(err);
        const erroStatus = err.response.status;
        if (erroStatus === 401) {
          const erros = err.response.data.errors;
          erros.map((erro) => toast.error(erro));
        } else {
          console.log(err);
        }
        history.push('/login');
      }
    } else {
      const botaoDelete = e.currentTarget.previousSibling;

      botaoDelete.setAttribute('style', 'display: block');
      e.currentTarget.setAttribute('style', 'display: none');

      toast.error(
        'Você deve confirmar com DELETAR no campo pedido para excluir sua conta.'
      );
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Configurações</h1>
      <Div>
        <Atencao>
          <strong> ATENÇÃO:</strong>
        </Atencao>
        <Paragrafo>
          Você está prestes a excluir sua conta <strong>PERMANENTEMENTE</strong>
          . Confirme no botão abaixo, caso queira realmente deletar sua conta.{' '}
        </Paragrafo>
        <Button type="submit" onClick={handleClickAsk}>
          Deletar conta
        </Button>

        <Form
          style={{ display: 'none' }}
          onSubmit={(e) => {
            handleClick(e);
          }}
        >
          <div>
            <input
              onChange={(e) => setConfirmation(e.target.value)}
              value={confirmation}
              type="text"
            />
            <button type="submit">Deletar</button>
          </div>
          <p>
            Para confirmar, digite <strong>DELETAR</strong> no campo acima.
          </p>
        </Form>
      </Div>
    </Container>
  );
}
