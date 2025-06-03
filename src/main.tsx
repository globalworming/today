import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Import prefetch utility to warm up the server on page load
import './utils/prefetch'

createRoot(document.getElementById("root")!).render(<App />);
