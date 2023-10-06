import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./store";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Router>
  </Provider>
);
