import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.sass';
import App from './App';

// ReactDOM
ReactDOM.render(
  <App />,
  document.getElementById("root")
);

// hot
if (module.hot) {
  module.hot.accept()
};

