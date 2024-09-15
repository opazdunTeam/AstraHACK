import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ChatList = ({ chats, onSelectChat }) => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('Updated chats:', chats);
  }, [chats]);
  
  useEffect(() => {
    console.log('Selected chat ID:', selectedChatId);
  }, [selectedChatId]);
  

  const handleSelectChat = (chat) => {
    // Убедитесь, что поле `messages` существует, если нет - попробуйте использовать поле `message`
    const messages = chat.messages || JSON.parse(chat.message || '[]');
  
    if (!messages || !Array.isArray(messages)) {
      console.error("Selected chat is missing or has no valid messages.");
      return;
    }
  
    setSelectedChatId(chat.id);
    onSelectChat({ ...chat, messages }); // Передайте объект с правильным полем `messages`
    setSearchTerm('');
    setSuggestions([]);
  
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('chat', chat.id);
    navigate(`/chats?${queryParams.toString()}`);
  };
  

  const searchChatsOnServer = async (searchTerm) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/search_chats?query=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error('Ошибка сети');
      }
      const data = await response.json();
      setSuggestions(data);  // Предполагается, что сервер возвращает массив чатов
    } catch (error) {
      console.error('Ошибка при поиске чатов:', error);
      setSuggestions([]);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      searchChatsOnServer(value);  // Запускаем поиск на сервере
    } else {
      setSuggestions([]);  // Очищаем подсказки, если поле поиска пустое
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    console.log('Suggestion selected:', suggestion);  // Добавим логирование
    handleSelectChat(suggestion);
    setSuggestions([]);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length <= maxLength ? text : text.substring(0, maxLength) + '...';
  };
  

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsInputFocused(false);
      if (!searchTerm) {
        setSuggestions([]);
      }
    }, 100);
  };

  const showSuggestions = isInputFocused && searchTerm && suggestions.length > 0;

  return (
    <div className="chat-list">
      <div className="searchUsersInput">
        <svg fill="#000000" height="20" width="20" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488.4 488.4">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <g>
                <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6 s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2 S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7 S381.9,104.65,381.9,203.25z"></path>
              </g>
            </g>
          </g>
        </svg>
        <input
          type="text"
          placeholder="Поиск чатов..."
          value={searchTerm}
          onChange={handleChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {showSuggestions && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSelectSuggestion(suggestion)}>
                <img src={suggestion.avatar} alt="Avatar"/>
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {chats.map((chat) => {
        const lastMessage = chat.messages && chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
        const isSelected = chat.id === selectedChatId;

        return (
          <div
            key={chat.id}
            className={`chat-list-item ${isSelected ? 'selected' : ''}`}
            onClick={() => handleSelectChat(chat)}
          >
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
