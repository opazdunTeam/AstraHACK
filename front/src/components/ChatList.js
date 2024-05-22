// файл отображения колонки чатов
import React from 'react';

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <div className="chat-list">
      {chats.map((chat, index) => {
        const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
        return (
          <div key={index} className="chat-list-item" onClick={() => onSelectChat(chat)}>
            <div className="chat-header">
              <div className="chat-name">{chat.name}</div>
              {lastMessage && <div className="last-message-time">{lastMessage.time}</div>}
            </div>
            <div className="last-message">
              {lastMessage ? truncateText(lastMessage.text, 50) : ''}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;

