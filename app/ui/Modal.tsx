import React, { useState, FC } from 'react';
import '../styles/Modal.css'; // Optional, for styling

// Define the prop type for the Modal component
interface ModalProps {
  content: JSX.Element; // Accept JSX to render inside the modal
  onClose: () => void;  // A callback function to handle modal close action
}

// The Modal component
const Modal: FC<ModalProps> = ({ content, onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close modal when clicking outside the content
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {content}
        <button className="van-button van-button--default van-button--normal exchange-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;