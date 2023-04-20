import type { Middleware, MiddlewareAPI } from 'redux';

import type { TAppActions, AppDispatch, RootState } from '../index';
import {
  TWSActions,
  TWSStoreActions,
} from '../services/actions/ws-actions';



export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
  
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TWSActions ) => {
      const { dispatch} = store;
      const { type, payload } = action;  
    
      if (type === wsActions.wsInitProfile) {
        // объект класса WebSocket
        socket = new WebSocket(payload);
  }

      if (type === wsActions.wsInit) {        
            // объект класса WebSocket
        socket = new WebSocket(payload);
      }
      if (socket) {
                // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: wsActions.onOpen, payload: event });
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: wsActions.onError, payload: event });
        };

                // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const { data } = event;
          dispatch({ type: wsActions.onMessage, payload: data });
        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: wsActions.onWSClose, payload: event });
        };

        if (type === wsActions.wsSendMessage) {
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