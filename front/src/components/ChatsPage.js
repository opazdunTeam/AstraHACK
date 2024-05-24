// файл для отображения страницы и логики страницы чатов
import React, { useState, useEffect } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import './ChatsPage.css';

const ChatsPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  //переменная для передачи информации по чатам
  const [chats, setChats] = useState([
    { name: 'Тройственный союз', id: 1, avatar: 'https://i.pinimg.com/originals/96/85/73/968573016b60734245728f7845b2ae80.jpg', messages: [] }, // messages: [ text: str, isMine: bool, time: Date ]
    { name: 'Флуд 2.0', id: 2, avatar: 'path/to/avatar1.png', messages: [] },
    // Добавьте больше чатов по необходимости
  ]);

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


  const handleResize = () => {
    setIsMobile(window.innerWidth <= 900);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
  };

  const handleBackButtonClick = () => {
    setSelectedChat(null);
  };


  return (
    <div className="chats-page">
      {(!isMobile || !selectedChat) && (
        <ChatList chats={chats} onSelectChat={handleSelectChat} handleGoButtonClick={handleSelectChat} />
      )}
      <div className="chat-container">
        {selectedChat ? (
          <ChatWindow
            chatName={selectedChat.name}
            chatAvatar={selectedChat.avatar}
            messages={selectedChat.messages}
            onSendMessage={handleSendMessage}
            backButtonClick={handleBackButtonClick}
          />
        ) : (
          !isMobile && <div className="select-chat-prompt"><h1>Выберите чат для просмотра</h1></div>
        )}
      </div>
    </div>
  );
};

export default ChatsPage;
