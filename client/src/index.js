import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import './style/index.css';
import App from './App';
import store from "./redux/store";

// import reportWebVitals from './reportWebVitals';

import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
