// элемент чата на странице
import React, { useState, useEffect, useRef  } from 'react';
import ChatHeader from './ChatHeader';
import FileMessage from './FileMessage';

const ChatWindow = ({ chatName, chatAvatar, messages, onSendMessage, backButtonClick }) => {
  const [message, setMessage] = useState('');
  const [fileMessage, setFileMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showFileModal, setShowFileModal] = useState(false);
  const chatContainerRef = useRef(null);


  const sendMessageToServer = async (messageData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
  
      const result = await response.json();
      console.log('Message sent:', result);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  


  useEffect(() => {
    autoResizeTextarea(document.getElementById('messageInput'));
    scrollToBottom();
  }, [message, fileMessage, selectedFiles]);

  useEffect(() => {
    autoResizeTextarea(document.getElementById('fileMessageInput'));
  }, [fileMessage]);

  // Функция для отправки сообщений
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

  // Функция для прокрутки вниз при добавлении нового сообщения
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Обработчик для обработки нажатия клавиши Enter
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

  // Функция для автоматического изменения высоты текстового поля
  const autoResizeTextarea = (textarea) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  // Пример переписки 2х юзеров
  // messages = [
  //   { text: "Привет!", isMine: true, username: "User1" },
  //   { text: "Как дела?", isMine: false, username: "Дарк" },
  //   { text: "Отлично, спасибо!", isMine: true, username: "User1" },
  //   { text: "Рад слышать!", isMine: false, username: "Андрей Беляев" },
  // ];

 // Функция для открытия диалога выбора файла
  const handleFileClick = () => {
    document.getElementById('fileInput').click();
    autoResizeTextarea(document.getElementById('messageInput'));
  };

  // Обработчик выбранных файлов для соблюдения форматов
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileReaders = [];

    files.forEach((file) => {
      if (file.type.startsWith("text/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target.result;
          const textFile = new File([text], file.name, { type: file.type });
          setSelectedFiles((prevFiles) => [...prevFiles, textFile]);
        };
        reader.readAsText(file, "UTF-8");
        fileReaders.push(reader);
      } else {
        setSelectedFiles((prevFiles) => [...prevFiles, file]);
      }
    });

    transferText();
    setShowFileModal(true);

    e.target.value = null;
  };

  // Функция для отправки файлов
  const handleSendFilesSequentially = () => {
    const newMessages = [];

    if (selectedFiles.length > 0) {
      newMessages.push({
        files: selectedFiles,
        text: message.trim() || fileMessage.trim(), // Добавляем текстовое сообщение
        isMine: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } else if (message.trim()) {
      newMessages.push({
        text: message.trim(),
        isMine: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } else if (fileMessage.trim()) {
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


  // Функция для закрытия модального окна выбора файла
  const handleCloseFileModal = () => {
    setSelectedFiles([]);
    transferText();
    setShowFileModal(false);
  };

  // Функция для переноса текста в соответствующее поле (в зависимости от активного модального окна)
  const transferText = () => {
    if (showFileModal) {
      setMessage(fileMessage);
      setFileMessage('');
    } else {
      setFileMessage(message);
      setMessage('');
    }
  };

  // Обработчик изменения в текстовом поле ввода для файла
  const handleFileInputChange = (e) => {
    setFileMessage(e.target.value);
  };

  // Функция для обрезки имени файла, чтобы оно умещалось в пределах максимальной длины
  const truncateFileName = (fileName, maxLength = 25) => {
    if (fileName.length <= maxLength) {
      return fileName;
    }
    const truncated = fileName.slice(0, maxLength / 2) + '...' + fileName.slice(-maxLength / 2);
    return truncated;
  };

  // генерация цвета по имени
  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 50%)`; // Генерация цвета в формате HSL
    return color;
  }  ;


  return (
    <div className="chat-container">
       <ChatHeader
         avatar={chatAvatar}
         name={chatName}
         backButton={backButtonClick}
       />
      <div className="chat-window-wrapper" ref={chatContainerRef}>
        <div className="chat-window">
          {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.isMine ? 'my-message' : 'other-message'}`}>
                {!msg.isMine &&
                    <div className="message-username" style={{color: stringToColor(msg.username)}}>
                      {msg.username}
                    </div>}
                <div className="message-text">
                {msg.files && msg.files.map((file, i) => <FileMessage key={i} file={file} />)}
                  {msg.text}
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
                  <span>{truncateFileName(file.name)}</span>
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
