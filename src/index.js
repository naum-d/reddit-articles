import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const target = document.querySelector('#root');

const Root = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, target);
