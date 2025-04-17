import React from 'react';

const CustomNotification = ({ title, message, type = 'error', onClose }) => {
  const colors = {
    error: 'indianred',
    success: 'forestgreen',
    warning: 'orange'
  };

  const color = colors[type];

  return (
    <div className="fixed top-4 right-4 z-50 flex w-3/4 h-24 overflow-hidden bg-white shadow-lg max-w-96 rounded-xl">
      <svg xmlns="http://www.w3.org/2000/svg" height="96" width="16">
        <path
          strokeLinecap="round"
          strokeWidth="2"
          stroke={color}
          fill={color}
          d="M 8 0 
             Q 4 4.8, 8 9.6 
             T 8 19.2 
             Q 4 24, 8 28.8 
             T 8 38.4 
             Q 4 43.2, 8 48 
             T 8 57.6 
             Q 4 62.4, 8 67.2 
             T 8 76.8 
             Q 4 81.6, 8 86.4 
             T 8 96 
             L 0 96 
             L 0 0 
             Z"
        ></path>
      </svg>
      <div className="mx-2.5 overflow-hidden w-full">
        <p
          className={`mt-1.5 text-xl font-bold text-[${color}] leading-8 mr-3 overflow-hidden text-ellipsis whitespace-nowrap`}
        >
          {title}
        </p>
        <p className="overflow-hidden leading-5 break-all text-zinc-400 max-h-10">
          {message}
        </p>
      </div>
      <button className="w-16 cursor-pointer focus:outline-none" onClick={onClose}>
        <svg
          className="w-7 h-7"
          fill="none"
          stroke={color}
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default CustomNotification;