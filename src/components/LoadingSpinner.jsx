import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-8 w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  );
};

export default LoadingSpinner;
