import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import './ChatsPage.css';

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
      const newMessage = { text: message, isMine: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      const updatedChats = chats.map((chat) => {
        if (chat.id === selectedChat.id) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
          };
        }
        return chat;
      });
      setChats(updatedChats);
      setSelectedChat({
        ...selectedChat,
        messages: [...selectedChat.messages, newMessage],
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
          <div className="select-chat-prompt"><h1>Выберите чат для просмотра</h1></div>
        )}
      </div>
    </div>
  );
};

export default ChatsPage;
