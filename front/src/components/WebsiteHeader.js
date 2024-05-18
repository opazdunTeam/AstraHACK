import React from 'react';
import { Link } from 'react-router-dom';
import './WebsiteHeader.css';

const WebsiteHeader = () => {
  return (
    <header className="header">
      <Link to="/" className="logo" style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>
        <div className="liner" style={{ display: 'flex', alignItems: 'center' }}>
            <img src='/icon.jpg' alt="ZKT Group Logo" style={{ marginRight: '10px', borderRadius: '50%', userSelect: "none" }} width="50" height="50" />
            <span>ZKT Group</span>
        </div>
      </Link>
      <div className="actions">
        <button className="action-button">Авторизация</button>
        <button className="action-button">Регистрация</button>
      </div>
    </header>
  );
}

export default WebsiteHeader;