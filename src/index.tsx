// src/index.tsx


import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './Store';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);

root.render(
  <Provider  store={store}>
    <App  />
  </Provider>,
);


