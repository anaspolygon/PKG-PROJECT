import React from 'react'

const Loader = () => {
  return (
    <div className="w-full h-[calc(100vh-290px)] flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Outer rotating ring */}
        <div className="relative">
          {/* Main spinner */}
          <div className="h-20 w-20 animate-spin rounded-full border-4 border-gray-200 border-t-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          
          {/* Inner pulse effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 animate-pulse rounded-full bg-primary/20"></div>
          </div>
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-primary animate-pulse"></div>
          </div>
        </div>
        
        {/* Loading text with animation */}
        <div className="flex flex-col items-center space-y-2">
          <p className="text-lg font-medium text-gray-800 animate-pulse">Loading</p>
          <div className="flex space-x-1">
            <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader