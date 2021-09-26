import App from './App';
import configureStore from "./configureStore";
import { PersistGate } from "redux-persist/integration/react";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './index.css';
import * as serviceWorker from "./serviceWorker";

const store = configureStore();
toast.configure();

ReactDOM.render(
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
