import React, { useState, useEffect } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import './ChatsPage.css';
import { useLocation } from 'react-router-dom';

const ChatsPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [chats, setChats] = useState([]);  // Инициализируем как пустой массив

  const location = useLocation();

  const GetChats = async () => {
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('username');
    const password = queryParams.get('password');

    try {
      const response = await fetch("http://127.0.0.1:8000/chats", {
        method: "POST",
        headers: { 
          "Accept": "application/json", 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
          username: username,
          password: password
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setChats(data);  // Устанавливаем данные только если это массив
      } else {
        console.error('Expected array but got:', data);
        setChats([]);  // Обнуляем состояние, если данные не массив
      }
    } catch (error) {
      console.error('Ошибка при получении чатов:', error);
      setChats([]);  // Обнуляем состояние при ошибке
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      GetChats();
    }, 1000);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [location.search]);

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

  const handleBackButtonClick = () => {
    setSelectedChat(null);
  };

  return (
    <div className="chats-page">
      {(!isMobile || !selectedChat) && (
        <ChatList chats={chats} onSelectChat={handleSelectChat} />
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
          !isMobile && <div className="select-chat-prompt"></div>
        )}
      </div>
    </div>
  );
};

export default ChatsPage;
