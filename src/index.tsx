import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-ts';
import 'typeface-roboto';

import App from './App';

const root = document.createElement('div');
document.body.appendChild(root);

hot(module)(ReactDOM.render(<App />, root));
