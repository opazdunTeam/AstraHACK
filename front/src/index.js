import React from 'react';
import ReactDOM from 'react-dom'; // Импорт ReactDOM
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Импорт Router
import MainPage from './components/MainPage';
import Сhats from './components/Сhats';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/chats" element={<Сhats />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);