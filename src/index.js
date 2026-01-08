import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import Tailwind CSS styles
import MoonersDashboard from './MoonersDashboard'; // Your main component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MoonersDashboard />
  </React.StrictMode>
);
