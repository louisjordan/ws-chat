import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

/* Core App module */
import App from './components/App.jsx';


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(App);

if(module.hot) {
  module.hot.accept('./components/App.jsx', () => {
    render(App);
  });
}
