import React from 'react';

const LoadingSkeleton = ({ type = 'text', lines = 3, className = '' }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'text':
        return (
          <div className={`animate-pulse ${className}`}>
            {Array.from({ length: lines }).map((_, index) => (
              <div
                key={index}
                className="h-4 bg-gray-300 rounded mb-2"
                style={{ width: `${Math.random() * 40 + 60}%` }}
              />
            ))}
          </div>
        );
      case 'card':
        return (
          <div className={`animate-pulse bg-white p-4 rounded-lg shadow ${className}`}>
            <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded mb-2 w-1/2"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          </div>
        );
      case 'avatar':
        return (
          <div className={`animate-pulse ${className}`}>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          </div>
        );
      case 'button':
        return (
          <div className={`animate-pulse h-10 bg-gray-300 rounded ${className}`}></div>
        );
      default:
        return (
          <div className={`animate-pulse h-4 bg-gray-300 rounded ${className}`}></div>
        );
    }
  };

  return renderSkeleton();
};

export default LoadingSkeleton;
