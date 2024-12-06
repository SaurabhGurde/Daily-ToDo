import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./redux/slice";
import { store } from "./redux/store";
import { StyledEngineProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
