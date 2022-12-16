import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBKp6-_y_x3SVGBxCW6HmCFUnwNz-t3iw4",
  authDomain: "discover-pnw.firebaseapp.com",
  projectId: "discover-pnw",
  storageBucket: "discover-pnw.appspot.com",
  messagingSenderId: "834434795868",
  appId: "1:834434795868:web:92d4b9ea99b0de286cd999",
  measurementId: "G-02VVYJ20EW"
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
