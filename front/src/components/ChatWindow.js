// элемент чата на странице
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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const handleInputChange = (e) => {
    setMessage(e.target.value);
    autoResizeTextarea(e.target);
  };

  const autoResizeTextarea = (textarea) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
// Пример использования добавления имён к сообщениям
//  const messages = [
//    { text: "Привет!", isMine: true, username: "User1" },
//    { text: "Как дела?", isMine: false, username: "User2" },
//    { text: "Отлично, спасибо!", isMine: true, username: "User1" },
//    { text: "Рад слышать!", isMine: false, username: "User2" },
//  ];


  return (
    <div className="chat-container">
      <div className="chat-window-wrapper">
        <div className="chat-window">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.isMine ? 'my-message' : 'other-message'}`}>
              {!msg.isMine && <div className="message-username">{msg.username}</div>}
              <div className="message-text">
                {msg.text}
              </div>
              <div className="message-time">
                {msg.time}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="message-input-container">
        <div className="message-input-wrapper">
          <div className="message-input">
            <textarea
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Введите сообщение..."
            />
            <svg class="svg-appendix" width="9" height="20"><defs><filter x="-50%" y="-14.7%" width="200%" height="141.2%" filterUnits="objectBoundingBox" id="composerAppendix"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0" in="shadowBlurOuter1"></feColorMatrix></filter></defs><g fill="none" fill-rule="evenodd"><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="#000" filter="url(#composerAppendix)"></path><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="#FFF" class="corner"></path></g></svg>
            <button onClick={handleSend}>Отправить</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
