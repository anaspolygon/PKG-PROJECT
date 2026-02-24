"use client";
import React, { FC, ReactNode, useEffect, useState } from "react";

interface ModalProps {
  title: string;
  description?: string;
  children: ReactNode;
  width?:number
  closeModal: () => void;
}
const Modal: FC<ModalProps> = ({ title, children, closeModal,width = 672 }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setIsOpen(true), 10);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => closeModal(), 200);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the backdrop itself, not its children
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className="overflow-y-auto max-h-screen">
      <div 
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-black/50' : 'bg-black/0'
        }`}
      >
        <div 
          className={`bg-white rounded-xl shadow-lg p-6 relative transition-all duration-300 max-h-[650px] overflow-y-auto ${
            isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4'
          }`}
          style={{width}}
        >
          <h2 className="text-xl font-medium mb-6">{title}</h2>
          {children}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-2xl transition-all duration-200 cursor-pointer"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
