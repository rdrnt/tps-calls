import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';

import App from './App';

import { Analytics } from './helpers';

Analytics.initialize();

const domNode = document.getElementById('root');
const root = createRoot(domNode as Element);
root.render(<App />);
