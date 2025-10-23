import React from 'react';
import ReactDOM from 'react-dom/client';
import CalculatorPage from './CalculatorPage';
import './style.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <CalculatorPage />
  </React.StrictMode>
);
