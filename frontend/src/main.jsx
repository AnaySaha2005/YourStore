import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import store, { persistor } from './app/store'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
    <App />
    </PersistGate>
  </Provider>
);
