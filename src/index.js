import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//saba
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, initializeAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

//this function knows how to specifically connect to your firebase
const firebaseConfig = {
  apiKey: "AIzaSyBx45cplxXKGt-hrrhtgnVSLlSC-lkwdY8",
  authDomain: "dyslexai-38eb6.firebaseapp.com",
  projectId: "dyslexai-38eb6",
  storageBucket: "dyslexai-38eb6.appspot.com",
  messagingSenderId: "311757195829",
  appId: "1:311757195829:web:e4ccae7990091958debf7c",
  measurementId: "G-R11CZHDTQ6"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
// db.collection('todos').getDocs();
// const todoCollection = collection(db, 'todos');
// const snapshot = await getDocs(todosCol);

//detect auth state

onAuthStateChanged(auth, (user) => {
if (user !== null) {
  console.log('logged in');
}
else {
  console.log('no user');
}
});

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
