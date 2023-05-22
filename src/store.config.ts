import type { Middleware } from "redux";
import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./services/reducers/root-reducer";
import { socketMiddleware } from "./middleware/socket-middleware";
import {
  WS_CONNECTION_START,
  WS_SEND_MESSAGE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TWSStoreActions,
  WS_CONNECTION_ERROR,
} from "./services/actions/ws-actions";

declare global {
  interface Window {
    ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]?: typeof compose;
  }
}

const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onWSClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const configureStore = () => {
  const middlewares: Middleware[] = [thunk];
  let composeEnhancers = compose;
  console.log(process.env)
  if (process.env.NODE_ENV === "development") {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

      middlewares.push(socketMiddleware(wsActions));
    }
  }

  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
};

export default configureStore;
