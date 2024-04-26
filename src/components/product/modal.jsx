import React, { useState, useEffect } from 'react';
import './modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  const handleCloseClick = (e) => {
    e.stopPropagation(); // Previene el cierre cuando se hace clic dentro del modal
    onClose();
  };

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscClose);

    return () => {
      window.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose]);

  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;