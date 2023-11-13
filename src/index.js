import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Appcopy from './components/App';
const style = 'background-color: red; color: white; font-style: italic; border: 5px solid black; font-size: 4em; text-align:center;'
console.log("%c!WARNING", style);
const style1 = 'background-color: red; color:white; font-style: bold; font-size:4em;'
console.error("%cDon't type anything in console. It will auto submit your quiz.",style1);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Appcopy />
  </React.StrictMode>
);