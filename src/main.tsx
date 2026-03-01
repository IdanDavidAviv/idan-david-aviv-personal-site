import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initDevLogger } from './lib/devLogger'

// Mirror browser console → Vite terminal (dev only, no-op in production)
initDevLogger()

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
