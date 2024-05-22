// файл отображения списка чатов
import React from 'react';

const truncateText = (text, maxLength) => {
  if (!text) return ''; // Добавлено для предотвращения ошибки
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
              <img src={'https://cs14.pikabu.ru/post_img/2021/05/08/12/16205042291362743.jpg'} alt="Avatar" className="chat-list-avatar" />
              <div className="grid-wrapper">
                <div className="chat-name">{chat.name}</div>
                <div className="last-message">
                  {lastMessage ? truncateText(lastMessage.text, 50) : ''}
                </div>
              </div>
              {lastMessage && <div className="last-message-time">{lastMessage.time}</div>}
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default ChatList;

