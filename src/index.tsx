import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { compose, legacy_createStore as createStore, applyMiddleware, ActionCreator,Action,AnyAction } from 'redux';
import rootReducer from './services/reducers/root-reducer';
import thunk, { ThunkAction } from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import {loginUser} from './services/actions/login';
import { TUserActions } from './services/actions/profile-actions';
import { TActionGetFeed,TActionConstructor } from './services/actions/actions';
import { TWSActions, WS_CONNECTION_ERROR } from './services/actions/ws-actions';
import { ThunkDispatch } from 'redux-thunk';
import { Dispatch } from 'redux';
import { socketMiddleware } from './middleware/socket-middleware' 
import { WS_CONNECTION_START,WS_SEND_MESSAGE,WS_CONNECTION_SUCCESS,WS_CONNECTION_CLOSED, WS_GET_MESSAGE,TWSStoreActions} from './services/actions/ws-actions' 



declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const wsUrl: string = 'wss://norma.nomoreparties.space/orders/all';

const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

const store = createStore(rootReducer, applyMiddleware(thunk,socketMiddleware(wsUrl,wsActions)));
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export type TAppActions = TWSActions | TUserActions | TActionGetFeed | TActionConstructor ;
export type RootState=ReturnType<typeof store.getState>;
export type TypedDispatch<T> = ThunkDispatch<T, any, TAppActions>;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, RootState, unknown, TAppActions>>;
export type AppDispatch = ThunkDispatch<RootState, never, TAppActions>;

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
          <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

