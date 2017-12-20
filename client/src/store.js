import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import io from 'socket.io-client';
import createSocketIoMiddleware from 'redux-socket.io';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers/reducer';

const socket = io('http://192.168.43.28:8000');
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

export default createStore(
  combineReducers({
    reducer,
  }),
  composeWithDevTools(applyMiddleware(socketIoMiddleware)),
);
