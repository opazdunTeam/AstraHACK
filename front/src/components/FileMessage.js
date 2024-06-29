import React from 'react';
import './FileMessage.css';

const FileMessage = ({ file }) => {
  const getFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
  };

  const truncateFileName = (fileName, maxLength = 30) => {
    if (fileName.length <= maxLength) {
      return fileName;
    }
    const truncated = fileName.slice(0, maxLength / 2) + '...' + fileName.slice(-maxLength / 2);
    return truncated;
  };


  return (
      <a href={URL.createObjectURL(file)} download={file.name} className="download-button">
          <div className="file-message">
              <div className="svg-container">
                  <svg width="50px" height="50px" viewBox="0 0 400 400" fill="#101010"
                       xmlns="http://www.w3.org/2000/svg">
                      <title/>
                      <g id="xxx-file">
                          <path className="cls-1"
                                d="M325,105H250a5,5,0,0,1-5-5V25a5,5,0,0,1,10,0V95h70a5,5,0,0,1,0,10Z"/>
                          <path className="cls-1"
                                d="M300,380H100a30,30,0,0,1-30-30V50a30,30,0,0,1,30-30H250a5,5,0,0,1,3.54,1.46l75,75A5,5,0,0,1,330,100V350A30,30,0,0,1,300,380ZM100,30A20,20,0,0,0,80,50V350a20,20,0,0,0,20,20H300a20,20,0,0,0,20-20V102.07L247.93,30Z"/>
                          <path className="cls-1" d="M275,180H125a5,5,0,0,1,0-10H275a5,5,0,0,1,0,10Z"/>
                          <path className="cls-1" d="M275,230H125a5,5,0,0,1,0-10H275a5,5,0,0,1,0,10Z"/>
                          <path className="cls-1" d="M275,280H125a5,5,0,0,1,0-10H275a5,5,0,0,1,0,10Z"/>
                          <path className="cls-1" d="M200,330H125a5,5,0,0,1,0-10h75a5,5,0,0,1,0,10Z"/>
                      </g>
                  </svg>
              </div>
                  <div className="file-details">
                      <span className="file-name">{truncateFileName(file.name)}</span>
                      <span className="file-size">{getFileSize(file.size)}</span>
                  </div>
              </div>
      </a>
);
};

export default FileMessage;
