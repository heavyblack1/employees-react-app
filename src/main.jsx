import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // update the UI of the application based on changes to the URL
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HashRouter hashType="noslash">
            <App />
        </HashRouter>
    </React.StrictMode>,
);
