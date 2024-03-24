const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./App');
const { createRoot } = require('react-dom/client');
require('../src/components/Welcome.css');
const { TransactionsProvider } = require('./context/TransactionContext');
require("slick-carousel/slick/slick.css");
require("slick-carousel/slick/slick-theme.css");

const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  React.createElement(React.StrictMode, null,
    React.createElement(TransactionsProvider, null,
      React.createElement(App, null)
    )
  )
);
