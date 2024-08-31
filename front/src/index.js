import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import ChatsPage from './components/ChatsPage';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/chats" element={<ChatsPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);