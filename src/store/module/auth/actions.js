import * as types from '../types';

export function loginRequest(payload) {
  return { type: types.LOGIN_REQUEST, payload };
}

// caso sucesso na request do saga, ele vai chamar essa funcao, onde o payload é { token, user: {...}, }, daqui, vai pro reducer com esse payload
export function loginSuccess(payload) {
  return { type: types.LOGIN_SUCCESS, payload };
}

export function loginFailure(payload) {
  return { type: types.LOGIN_FAILURE, payload };
}

export function registerRequest(payload) {
  return { type: types.REGISTER_REQUEST, payload };
}

export function registerUpdatedSuccess(payload) {
  return { type: types.REGISTER_UPDATED_SUCCESS, payload };
}

export function registerCreatedSuccess(payload) {
  return { type: types.REGISTER_CREATED_SUCCESS, payload };
}

export function registerFailure(payload) {
  return { type: types.REGISTER_FAILURE, payload };
}
