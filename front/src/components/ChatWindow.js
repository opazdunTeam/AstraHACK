import React, { useState } from 'react';

const ChatWindow = ({ messages, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isMine ? 'my-message' : 'other-message'}`}>
            <div className="message-text">
              {msg.text}
            </div>
            <div className="message-time">
              {new Date().toLocaleTimeString()/*msg.time*/}
            </div>
          </div>
        ))}
      </div>
      <div className="message-input-container">
        <div className="message-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Введите сообщение..."
          />
          <button onClick={handleSend}>Отправить</button>
        </div>
      </div>
    </div>

  );
};

export default ChatWindow;
