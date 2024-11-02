import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = "662912288208-bcrl7sp1r4qri1gc03bkt5ekcse1p40v.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  
        <StrictMode>
        <BrowserRouter>
        <GoogleOAuthProvider clientId={clientId}>
            <App />
            </GoogleOAuthProvider>
        </BrowserRouter>
    </StrictMode>
    ,
)
