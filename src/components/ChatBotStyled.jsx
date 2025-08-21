import styled from 'styled-components';

const StyledWrapper = styled.div`
  .chatbox-container {
    display: flex;
    flex-direction: column;
    max-width: 800px;
    width: 100%;
    position: relative;
  }

  .chatbox {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    padding: 0.5rem 0.75rem;
    position: relative;
    
    @media (min-width: 768px) {
      padding: 0.75rem 1rem;
      border-radius: 1rem;
    }
  }

  .chatbox textarea {
    flex: 1;
    background-color: transparent;
    border: none;
    color: #374151;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 0.8125rem;
    line-height: 1.5;
    min-height: 1.5rem;
    max-height: 15rem;
    overflow-y: auto;
    padding: 0.5rem 0;
    resize: none;
    outline: none;
    
    @media (min-width: 768px) {
      font-size: 0.875rem;
    }
    
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }

    &::placeholder {
      color: #6b7280;
    }
  }

  .chatbox-actions {
    display: flex;
    gap: 0.375rem;
    align-items: center;
    
    @media (min-width: 768px) {
      gap: 0.5rem;
    }
  }

  .action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    border-radius: 0.25rem;
    color: #6b7280;
    cursor: pointer;
    height: 1.75rem;
    width: 1.75rem;
    transition: background-color 0.2s, color 0.2s;
    
    @media (min-width: 768px) {
      height: 2rem;
      width: 2rem;
    }

    &:hover {
      background-color: #f3f4f6;
      color: #111827;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      &:hover {
        background: none;
        color: #6b7280;
      }
    }
  }

  .send-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    color: #ffffff;
    background-color: #2563eb;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;
    
    @media (min-width: 768px) {
      width: 2rem;
      height: 2rem;
    }

    &:hover {
      background-color: #1d4ed8;
    }

    &:active {
      transform: scale(0.95);
    }

    &:disabled {
      background-color: #e5e7eb;
      cursor: not-allowed;
    }

    svg {
      width: 1.125rem;
      height: 1.125rem;
      
      @media (min-width: 768px) {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }

  .suggestion-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin-top: 0.5rem;
    
    @media (min-width: 768px) {
      gap: 0.5rem;
      margin-top: 0.75rem;
    }

    .suggestion-chip {
      font-size: 0.7rem;
      color: #4b5563;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 1rem;
      padding: 0.375rem 0.625rem;
      cursor: pointer;
      transition: background-color 0.2s, border-color 0.2s;
      
      @media (min-width: 768px) {
        font-size: 0.75rem;
        padding: 0.5rem 0.75rem;
      }

      &:hover {
        background-color: #f3f4f6;
        border-color: #d1d5db;
      }
    }
  }

  /* Dark mode styles */
  &.dark-mode {
    .chatbox {
      background-color: #1f2937;
      border-color: #374151;
    }

    .chatbox textarea {
      color: #e5e7eb;
      
      &::placeholder {
        color: #9ca3af;
      }
    }

    .action-button {
      color: #9ca3af;
      
      &:hover {
        background-color: #374151;
        color: #e5e7eb;
      }
    }

    .suggestion-chips .suggestion-chip {
      background-color: #374151;
      border-color: #4b5563;
      color: #e5e7eb;
      
      &:hover {
        background-color: #4b5563;
        border-color: #6b7280;
      }
    }
  }
`;

export default StyledWrapper;