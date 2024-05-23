// элемент чата на странице
import React, { useState, useEffect, useRef  } from 'react';
import ChatHeader from './ChatHeader';

const ChatWindow = ({ chatName, chatAvatar, messages, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [fileMessage, setFileMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showFileModal, setShowFileModal] = useState(false);
  const chatContainerRef = useRef(null);
  useEffect(() => {
    autoResizeTextarea(document.getElementById('messageInput'));
    scrollToBottom();
  }, [message, fileMessage, selectedFiles]);

  useEffect(() => {
    autoResizeTextarea(document.getElementById('fileMessageInput'));
  }, [fileMessage]);

  const handleSend = () => {
    if (message.trim() || selectedFiles.length > 0) {
      handleSendFilesSequentially();
      setMessage('');
      const textarea = document.getElementById('messageInput');
      if (textarea) {
        textarea.style.height = 'auto';
      }
    }
  };
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const handleInputChange = (e, type) => {
    if (type === 'message') {
      setMessage(e.target.value);
    } else if (type === 'fileMessage') {
      setFileMessage(e.target.value);
    }
  };
  const autoResizeTextarea = (textarea) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

// Пример использования добавления имён к сообщениям
//  const messages = [
//    { text: "Привет!", isMine: true, username: "User1" },
//    { text: "Как дела?", isMine: false, username: "User2" },
//    { text: "Отлично, спасибо!", isMine: true, username: "User1" },
//    { text: "Рад слышать!", isMine: false, username: "User2" },
//  ];
  const handleFileClick = () => {
    document.getElementById('fileInput').click();
    autoResizeTextarea(document.getElementById('messageInput'));
  };
  const handleFileChange = (e) => {
    setSelectedFiles([...selectedFiles, ...e.target.files]);
    transferText();
    setShowFileModal(true);
  };


  const handleSendFilesSequentially = () => {
    const newMessages = [];
    for (const file of selectedFiles) {
      newMessages.push({
        file,
        isMine: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
    if (message.trim()) {
      newMessages.push({
        text: message.trim(),
        isMine: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
    else if (fileMessage.trim()) {
      newMessages.push({
        text: fileMessage.trim(),
        isMine: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }

    onSendMessage(newMessages);
    setSelectedFiles([]);
    setShowFileModal(false);
    setMessage('');
    setFileMessage('');
    const fileTextarea = document.getElementById('fileMessageInput');
    if (fileTextarea) {
      fileTextarea.style.height = 'auto';
    }
  };
  const handleCloseFileModal = () => {
    setSelectedFiles([]);
    transferText();
    setShowFileModal(false);
  };
  const transferText = () => {
    if (showFileModal) {
      setMessage(fileMessage);
      setFileMessage('');

    } else {
      setFileMessage(message);
      setMessage('');
    }
  };
const handleFileInputChange = (e) => {
  setFileMessage(e.target.value);
};

  return (
    <div className="chat-container">
       <ChatHeader
         avatar={chatAvatar}
         name={chatName}
       />
      <div className="chat-window-wrapper" ref={chatContainerRef}>
        <div className="chat-window">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.isMine ? 'my-message' : 'other-message'}`}>
              {!msg.isMine && <div className="message-username">{msg.username}</div>}
              <div className="message-text">
                {msg.text}
                {msg.file && <div className="message-file"><a href={URL.createObjectURL(msg.file)} target="_blank" rel="noopener noreferrer">{msg.file.name}</a></div>}
              </div>
              <div className="message-time">
                {msg.time}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="message-input-container">
        <div className="message-input-wrapper">
          <div className="message-input">
            <textarea
              id="messageInput"
              value={message}
              onChange={(e) => handleInputChange(e, 'message')}
              onKeyPress={handleKeyPress}
              placeholder="Введите сообщение..."
            />
            <svg className="svg-appendix" width="9" height="20"><defs><filter x="-50%" y="-14.7%" width="200%" height="141.2%" filterUnits="objectBoundingBox" id="composerAppendix"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.0621962482 0 0 0 0 0.138574144 0 0 0 0 0.185037364 0 0 0 0.15 0" in="shadowBlurOuter1"></feColorMatrix></filter></defs><g fill="none" fill-rule="evenodd"><path d="M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="#000" filter="url(#composerAppendix)"></path><path d="M6 17H0В0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z" fill="#FFF" class="corner"></path></g></svg>
            <input
              type="file"
              id="fileInput"
              multiple
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <div className="svg-upload" onClick={handleFileClick}>
              <svg width="30px" height="30px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000">
                <path d="M54.35 31.22 32.94 50.75a13.65 13.65 0 0 1-19.3-19.3l21.41-19.53a9.1 9.1 0 0 1 12.87 12.87L26.51 44.31a4.55 4.55 0 0 1-6.43-6.43l21.45-19.57"/>
              </svg>
            </div>
            <button onClick={handleSend}>
              <svg fill="#000000" height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="-23.45 -23.45 515.94 515.94" transform="rotate(45)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M465.023,4.079c-3.9-3.9-9.9-5-14.9-2.8l-442,193.7c-4.7,2.1-7.8,6.6-8.1,11.7s2.4,9.9,6.8,12.4l154.1,87.4l91.5,155.7 c2.4,4.1,6.9,6.7,11.6,6.7c0.3,0,0.5,0,0.8,0c5.1-0.3,9.5-3.4,11.6-8.1l191.5-441.8C470.123,13.879,469.023,7.979,465.023,4.079z M394.723,54.979l-226.2,224.7l-124.9-70.8L394.723,54.979z M262.223,425.579l-74.5-126.9l227.5-226L262.223,425.579z"></path> </g> </g></svg>
            </button>
          </div>
        </div>
      </div>
      {showFileModal && (
        <div>
          <div className="overlay" onClick={handleCloseFileModal}></div>
          <div className="file-modal">
            <div className="file-modal-header">
              <button onClick={handleCloseFileModal}>✖</button>
              <span>Отправить {selectedFiles.length} файл(а/ов)</span>
              <button onClick={handleFileClick}>➕</button>
            </div>
            <div className="file-list">
              {selectedFiles.map((file, index) => (
                <div key={index} className="file-item">
                  <span>{file.name}</span>
                  <span>{(file.size / 1024).toFixed(1)} KB</span>
                </div>
              ))}
            </div>
            <div className="file-input-wrapper">
              <textarea
                id="fileMessageInput"
                value={fileMessage}
                onChange={handleFileInputChange} // Обработчик изменения для поля ввода файла
                onKeyPress={handleKeyPress}
                placeholder="Введите сообщение..."
              />
              <button onClick={handleSendFilesSequentially}>Отправить</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
