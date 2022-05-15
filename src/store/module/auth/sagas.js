// eslint-disable-next-line
import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import history from '../../../services/history';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';

// eslint-disable-next-line
function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload); // Payload que chega aqui vem do dispatch quando da submit no form da page de Login. { email, password, prevPath }

    yield put(actions.loginSuccess({ ...response.data })); // response.data é o retorno do post na rota /tokens da api_rest, isso é { token, user: {...}, }, daqui vai pra actioons com esses dados.

    toast.success('Login realizado com sucesso.');

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`; // Joga o Token no header padrao do axios, assim qualquer requisicao vai ter esse header com o token.

    history.push(payload.prevPath);
  } catch (e) {
    console.log(e);
    toast.error('Usuario ou senha inválidos');

    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line
function* registerRequest({ payload }) {
  const { id, nome, email, password } = payload;

  try {
    // se tiver um id no payload, o usuario esta logado, entao a pagina sera de edicao de dados
    if (id) {
      yield call(axios.put, '/users', {
        email,
        nome,
        password: password || undefined,
      });

      toast.success('Dados alterados com sucesso');

      yield put(actions.registerUpdatedSuccess({ nome, email, password }));
    }
    // se nao (else) tiver id, a pagina sera de criacao de novo usuario
    else {
      yield call(axios.post, '/users', {
        email,
        nome,
        password,
      });

      toast.success('Conta criada com sucesso');
      yield put(actions.registerCreatedSuccess({ nome, email, password }));

      history.push('/login');

      // yield put(actions.registerSuccess({ nome, email, password }));
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      toast.error(
        'E-mail foi alterado, por gentileza, faça novamento o login.'
      );
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
      yield put(actions.loginFailure());
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);

// try {
//   await axios.post('/users/', {
//     nome,
//     password,
//     email,
//   });

//   toast.success(
//     'Cadastro realizado com sucesso. Faça login com suas credenciais.'
//   );

//   setIsLoading(false);
//   history.push('/login');
// } catch (err) {
//   const errors = get(err, 'response.data.errors', []);
//   errors.map((error) => toast.error(error));
//   setIsLoading(false);
// }
