import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createRoot } from 'react-dom/client'; // Corrected import
import '../src/components/Welcome.css';
import { TransactionsProvider } from './context/TransactionContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById('root')).render( // Use createRoot directly
  <React.StrictMode>
    <TransactionsProvider>
      <App />
    </TransactionsProvider>
  </React.StrictMode>,
);
