import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, title, children }) => {
  // Jangan render apapun jika 'show' adalah false
  if (!show) {
    return null;
  }

  return (
    // Lapisan luar yang gelap
    <div className="modal-overlay" onClick={onClose}>
      {/* Konten modal di tengah */}
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
