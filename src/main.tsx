import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import { TraffiLightComponent } from './TrafficLightComponent';
// import App from './App';
// import Feedback from './Feedback';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TraffiLightComponent/>
  </React.StrictMode>
);
