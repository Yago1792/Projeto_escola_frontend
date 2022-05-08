import { persistStore } from 'redux-persist';

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import persistedReducers from './module/example/reduxPersist';
import rootReducer from './module/rootReducer';
import rootSaga from './module/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducers(rootReducer),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
export const persistor = persistStore(store);
