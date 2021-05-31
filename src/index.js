import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import "./screen/homeScreen/_base.scss"
import { Provider } from "react-redux"
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);


