import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'typeface-poppins';
import '@reach/slider/styles.css';
import '@reach/dialog/styles.css';
import '@reach/tooltip/styles.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import App from './App';

import { Firebase, Analytics } from './helpers';

Firebase.initialize();
Analytics.initialize();

export default ReactDOM.render(<App />, document.querySelector('#root'));
