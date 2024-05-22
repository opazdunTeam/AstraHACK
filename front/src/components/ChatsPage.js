// файл для отображения страницы и логики страницы чатов
import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import './ChatsPage.css';

const ChatsPage = () => {
  //переменная для передачи информации по чатам
  const [chats, setChats] = useState([
    //future structure { name: str, id: int, messages: [ type: str, filename: str, text: str, username: str, isMine: bool, time: Date ] }
    { name: 'Тройственный союз', id: 1, messages: [] }, //now structure { name: str, id: int, messages: [ text: str, isMine: bool, time: Date ] }
    { name: 'Флуд 2.0', id: 2, messages: [] },
    // Добавьте больше чатов по необходимости
  ]);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = (newMessages) => {
    if (selectedChat) {
      const updatedMessages = [...selectedChat.messages, ...newMessages];

      const updatedChats = chats.map((chat) => {
        if (chat.id === selectedChat.id) {
          return {
            ...chat,
            messages: updatedMessages,
          };
        }
        return chat;
      });

      setChats(updatedChats);
      setSelectedChat({
        ...selectedChat,
        messages: updatedMessages,
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
