import ReactDOM from 'react-dom';
import React from 'react';
import App from './components';

const renderApp = Component => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

renderApp(App);
