import React from 'react';
import ReactDOM from 'react-dom'; // Импорт ReactDOM
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Импорт Router
import MainPage from './components/MainPage';
import Сhat from './components/ChatsPage';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/chats" element={<Сhat />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);