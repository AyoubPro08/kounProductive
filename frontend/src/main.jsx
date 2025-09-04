import { createRoot } from 'react-dom/client'
import './components/css/index.css'
import App from './App.jsx'
import axios from "axios";


axios.defaults.baseURL = import.meta.env.MODE === "development"
  ? "http://localhost:3000/api/v1"
  : "/api/v1";

  
createRoot(document.getElementById('root')).render(
    <App />
)
