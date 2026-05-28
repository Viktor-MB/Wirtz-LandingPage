/* main.jsx — ponto de entrada da aplicação */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './styles.css';
import './components/image-slot.js'; // web component <image-slot> (auto-registra)
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>
);
