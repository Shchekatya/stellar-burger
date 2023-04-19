import type { Middleware, MiddlewareAPI } from 'redux';

import type { TAppActions, AppDispatch, RootState } from '../index';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  TWSActions,
  TWSStoreActions,
  WS_CONNECTION_START,
  WS_CONNECTION_PROFILE
} from '../services/actions/ws-actions';
import { getCookie } from '../utils/cookie';


export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
  
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TWSActions ) => {
      const { dispatch} = store;
      const { type, payload } = action;  
    
        const cookie=getCookie("authToken")
      if (type === WS_CONNECTION_PROFILE ) {
        // объект класса WebSocket
        socket = new WebSocket(payload);
  }

      if (type === WS_CONNECTION_START) {        
            // объект класса WebSocket
        socket = new WebSocket(payload);
      }
      if (socket) {
                // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

                // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const { data } = event;
          dispatch({ type: WS_GET_MESSAGE, payload: data });
        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };

        if (type === WS_SEND_MESSAGE) {
          const payload = action.payload;
          const message = payload;
                    // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
    }) as Middleware;
}; 