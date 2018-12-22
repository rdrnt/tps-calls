import React from 'react';

import ModalManager from './components/ModalManager';
import SnackbarManager from './components/SnackbarManager';
import TopAppBar from './containers/TopAppBar';

const Template = ({ children }) => (
  <div>
    <TopAppBar />
    <ModalManager />
    <SnackbarManager />
    {children}
  </div>
);

export default Template;
