import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
  ActionCreator,
  Action,
  AnyAction,
} from "redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { loginUser } from "./services/actions/login";
import { TUserActions } from "./services/actions/profile-actions";
import { TActionGetFeed, TActionConstructor } from "./services/actions/actions";
import { TWSActions, WS_CONNECTION_ERROR } from "./services/actions/ws-actions";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import configureStore from "./store.config";
import { render } from "react-dom";
import { createRoot } from "react-dom/client";

const store = configureStore();

// export type TWSStoreActions = { [key in TWSActions['type']] : key }

const wsUrl: string = "wss://norma.nomoreparties.space/orders";

export type TAppActions =
  | TWSActions
  | TUserActions
  | TActionGetFeed
  | TActionConstructor;

export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch<T> = ThunkDispatch<T, any, TAppActions>;
export type AppDispatch = ThunkDispatch<RootState, never, TAppActions>;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TAppActions>
>;


const Root: React.FC = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </React.StrictMode>
  );
};

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
      root.render(<Root />);



reportWebVitals();
