import React from 'react';
import { X, Key, Tag, Info } from 'lucide-react';
import './ViewExpenseCategoryModal.css';

function ViewExpenseCategoryModal({ category, onClose }) {
  if (!category) return null;

  return (
    <div className="vec-modal-overlay fade-in">
      <div className="vec-modal-container slide-down">
        <div className="vec-modal-header">
          <h3 className="vec-modal-title">
            <Info size={20} className="title-icon" /> 
            Expense Category Details
          </h3>
          <button className="vec-modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        
        <div className="vec-modal-body">
          <div className="vec-info-card">
            <div className="vec-info-row">
              <div className="vec-info-icon-wrap bg-blue-100 text-blue-600">
                <Key size={18} />
              </div>
              <div className="vec-info-content">
                <span className="vec-info-label">Category Code</span>
                <span className="vec-info-value">{category.code}</span>
              </div>
            </div>
            
            <div className="vec-info-divider"></div>
            
            <div className="vec-info-row">
              <div className="vec-info-icon-wrap bg-purple-100 text-purple-600">
                <Tag size={18} />
              </div>
              <div className="vec-info-content">
                <span className="vec-info-label">Category Name</span>
                <span className="vec-info-value">{category.name}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="vec-modal-footer">
          <button type="button" className="vec-btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewExpenseCategoryModal;
