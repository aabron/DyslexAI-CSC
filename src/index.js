import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//saba
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getDatabase } from "firebase/database";

//this function knows how to specifically connect to your firebase
const firebaseConfig = {
  apiKey: "AIzaSyBx45cplxXKGt-hrrhtgnVSLlSC-lkwdY8",
  authDomain: "dyslexai-38eb6.firebaseapp.com",
  projectId: "dyslexai-38eb6",
  storageBucket: "dyslexai-38eb6.appspot.com",
  messagingSenderId: "311757195829",
  appId: "1:311757195829:web:e4ccae7990091958debf7c",
  measurementId: "G-R11CZHDTQ6",
  databaseURL: "https://dyslexai-38eb6-default-rtdb.firebaseio.com/",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const database = getDatabase(firebaseApp);
//PUT LOGIN LOGIC IN /src/components/Modal.jsx

//saba
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

