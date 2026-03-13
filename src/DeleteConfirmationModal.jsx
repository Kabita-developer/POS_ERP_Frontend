import React, { useState, useEffect } from 'react';
import './DeleteConfirmationModal.css';
import { X, AlertTriangle } from 'lucide-react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen && !isAnimating) return null;

    return (
        <div className={`modal-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
            <div 
                className={`modal-content delete-modal ${isOpen ? 'slide-up' : ''}`} 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="delete-header">
                    <div className="warning-icon-wrapper">
                        <AlertTriangle size={32} />
                    </div>
                </div>

                <div className="delete-body">
                    <h2>Are you sure?</h2>
                    <p>
                        You are about to delete <span className="item-highlight">"{itemName}"</span>. 
                        This action cannot be undone.
                    </p>
                </div>

                <div className="delete-footer">
                    <button className="cancel-btn" onClick={onClose}>
                        No, Cancel
                    </button>
                    <button className="confirm-delete-btn" onClick={() => {
                        onConfirm();
                        onClose();
                    }}>
                        Yes, Delete It
                    </button>
                </div>
                
                <button className="close-top-btn" onClick={onClose}>
                    <X size={18} />
                </button>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
