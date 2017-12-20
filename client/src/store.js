import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux';
import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';
import reducer from './reducers/reducer';

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const socket = io('http://localhost:8000');
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

export default createStore(
  combineReducers({
    reducer,
  }),
  compose(applyMiddleware(socketIoMiddleware), reduxDevTools),
);
