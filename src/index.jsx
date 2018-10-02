// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './App.jsx';

ReactDOM.render(<AppContainer />, document.getElementById('react-root'));
