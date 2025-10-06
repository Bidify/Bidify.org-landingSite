import React from 'react';
import './ComingSoonPopup.scss';

const ComingSoonPopup = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="coming-soon-popup-overlay" onClick={onClose}>
      <div className="coming-soon-popup" onClick={(e) => e.stopPropagation()}>
        <div className="coming-soon-popup__header">
          <h3 className="coming-soon-popup__title">Coming Soon</h3>
          <button 
            className="coming-soon-popup__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="coming-soon-popup__content">
          <p className="coming-soon-popup__message">
            This feature is coming soon! Stay tuned for updates.
          </p>
        </div>
        <div className="coming-soon-popup__footer">
          <button 
            className="coming-soon-popup__button"
            onClick={onClose}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPopup;