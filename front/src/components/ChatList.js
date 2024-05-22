import React from 'react';

const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) {
    return text;
  }
  return text.substr(0, maxLength) + '...';
};

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <div className="chat-list">
      {chats.map((chat, index) => {
        const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
        return (
          <div key={index} className="chat-list-item" onClick={() => onSelectChat(chat)}>
            <div className="chat-header">
              <img src={chat.avatar} alt="Avatar" className="chat-avatar" />
              <div className="chat-details">
                <div className="chat-name-time">
                  <span className="chat-name">{chat.name}</span>
                  {lastMessage && <span className="last-message-time">{lastMessage.time}</span>}
                </div>
                <div className="last-message">
                  {lastMessage ? truncateText(lastMessage.text, 50) : ''}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
