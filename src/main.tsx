import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App';

import { initialize as initializeAnalytics } from './helpers/analytics';

initializeAnalytics();

const domNode = document.getElementById('root');
const root = createRoot(domNode as Element);
root.render(<App />);
