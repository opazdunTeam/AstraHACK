import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
    import './styles.css';

const ChatsPage = () => {
  const [chats, setChats] = useState([
    { name: 'Тройственный союз', id: 1, messages: [] },
    { name: 'Флуд 2.0', id: 2, messages: [] },
    // Добавьте больше чатов по необходимости
  ]);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = (message) => {
    if (selectedChat) {
      const updatedChats = chats.map((chat) => {
        if (chat.id === selectedChat.id) {
          return {
            ...chat,
            messages: [...chat.messages, { text: message, isMine: true }],
          };
        }
        return chat;
      });
      setChats(updatedChats);
      setSelectedChat({
        ...selectedChat,
        messages: [...selectedChat.messages, { text: message, isMine: true }],
      });
    }
  };

  return (
    <div className="chats-page">
      <ChatList chats={chats} onSelectChat={handleSelectChat} />
      <div className="chat-container">
        {selectedChat ? (
          <ChatWindow messages={selectedChat.messages} onSendMessage={handleSendMessage} />
        ) : (
          <div className="select-chat-prompt">Выберите чат для просмотра</div>
        )}
      </div>
    </div>
  );
};

export default ChatsPage;
