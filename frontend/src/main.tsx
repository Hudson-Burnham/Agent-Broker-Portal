import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./axios.tsx";
import { HashRouter } from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { persistedReducer } from "./store/reducer.tsx";
import { Store, legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";

const store: Store<State, Action> = createStore(persistedReducer);
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")as HTMLElement).render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HashRouter>
          <App />
        </HashRouter>
      </PersistGate>
    </Provider>
  // </React.StrictMode>
);

