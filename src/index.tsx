import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'typeface-poppins';
import '@reach/slider/styles.css';
import '@reach/dialog/styles.css';
import '@reach/tooltip/styles.css';

import App from './App';

const root = document.createElement('div');
document.body.appendChild(root);

export default ReactDOM.render(<App />, root);
