// React
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

// Redux
import configureStore from "./configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

// Toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CSS
import "./index.css";

import * as serviceWorker from "./serviceWorker";

toast.configure();

const store = configureStore();

ReactDOM.render(
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
