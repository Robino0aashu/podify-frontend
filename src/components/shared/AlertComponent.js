import React from 'react';

const Alert = ({ type, message }) => {
  let alertClasses = '';
  let textClasses = '';

  switch (type) {
    case 'info':
      alertClasses = 'bg-blue-50 text-blue-800 dark:bg-gray-800 dark:text-blue-400';
      textClasses = 'font-medium';
      break;
    case 'danger':
      alertClasses = 'bg-red-50 text-red-800 dark:bg-gray-800 dark:text-red-400';
      textClasses = 'font-medium';
      break;
    case 'success':
      alertClasses = 'bg-green-50 text-green-800 dark:bg-gray-800 dark:text-green-400';
      textClasses = 'font-medium';
      break;
    case 'warning':
      alertClasses = 'bg-yellow-50 text-yellow-800 dark:bg-gray-800 dark:text-yellow-300';
      textClasses = 'font-medium';
      break;
    default:
      alertClasses = 'bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      textClasses = 'font-medium';
      break;
  }

  return (
    <div className={`flex items-center p-4 mb-4 text-sm rounded-lg ${alertClasses}`} role="alert">
      <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className={textClasses}>{message}</span>
      </div>
    </div>
  );
};

export default Alert;
