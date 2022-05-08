import { toast } from 'react-toastify';
import * as types from '../types';

const initialState = {
  botaoClicado: false,
};

// -> acao -> reducer -> novoEstado: estado
// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case types.BOTAO_CLICADO_SUCCESS: {
      toast.success("Yeah! It's worked!");
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }

    case types.BOTAO_CLICADO_FAILURE: {
      toast.error('Ops! Something went wrong!');
      return state;
    }

    case types.BOTAO_CLICADO_REQUEST: {
      toast.success('One moment! I am processing.');
      return state;
    }
    default: {
      return state;
    }
  }
}
