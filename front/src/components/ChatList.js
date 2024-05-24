import React, { useState } from 'react';

const ChatList = ({ chats, onSelectChat }) => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSelectChat = (chat) => {
    setSelectedChatId(chat.id);
    onSelectChat(chat);
    setSearchTerm('');
    setSuggestions([]);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + '...';
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filteredSuggestions = chats.filter(chat => chat.name.toLowerCase().startsWith(value.toLowerCase()));
    setSuggestions(filteredSuggestions);
  };

  const handleSelectSuggestion = (suggestion) => {
    handleSelectChat(suggestion);
    setSuggestions([]);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
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
        const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
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
