import React, { useRef, useEffect, useState } from 'react';
import StyledWrapper from './ChatBotStyled';

const ChatBot = ({ onSend, message, setMessage, isLoading }) => {
  const textareaRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 120);
      textarea.style.height = `${Math.max(24, newHeight)}px`;
    }
  }, [message]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSend();
      }
    }
  };

  const handleSuggestionClick = (suggestionText) => {
    setMessage(suggestionText);
    textareaRef.current.focus();
  };

  return (
    <StyledWrapper className={isDarkMode ? 'dark-mode' : ''}>
      <div className="chatbox-container">
        <div className="chatbox">
          <textarea 
            ref={textareaRef}
            placeholder="Message AssistMe..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
            rows={1}
          />
          <div className="chatbox-actions">
            <button 
              className="action-button"
              title="Attach files"
              disabled={isLoading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"></path>
              </svg>
            </button>
            <button
              className="send-button"
              onClick={onSend}
              disabled={!message.trim() || isLoading}
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="suggestion-chips">
          <button className="suggestion-chip" onClick={() => handleSuggestionClick("Create an image of a futuristic city")}>
            Create an image
          </button>
          <button className="suggestion-chip" onClick={() => handleSuggestionClick("Analyze this data for insights")}>
            Analyze data
          </button>
          <button className="suggestion-chip" onClick={() => handleSuggestionClick("Help me write a professional email")}>
            Help me write
          </button>
          <button className="suggestion-chip" onClick={() => handleSuggestionClick("Explain quantum computing simply")}>
            Explain a topic
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
}

export default ChatBot;