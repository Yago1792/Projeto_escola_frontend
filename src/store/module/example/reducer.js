import * as types from '../types';

const initialState = {
  botaoClicado: false,
};

// -> acao -> reducer -> novoEstado: estado
// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case types.BOTAO_CLICADO_SUCCESS: {
      console.log('Yees! Success =D');
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }

    case types.BOTAO_CLICADO_FAILURE: {
      console.log('Oops! Deu erro =(');
      return state;
    }

    case types.BOTAO_CLICADO_REQUEST: {
      console.log('Estou fazendo a requisicao');
      return state;
    }
    default: {
      return state;
    }
  }
}
