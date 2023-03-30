import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import rootReducer from './services/reducers/root-reducer';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import {loginUser} from './services/actions/login';



declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const store = createStore(rootReducer, applyMiddleware<ReturnType<typeof loginUser>>(thunk));
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

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

