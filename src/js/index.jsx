import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();

// registerServiceWorker();
