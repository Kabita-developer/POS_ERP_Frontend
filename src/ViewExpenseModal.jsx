import React from 'react';
import { X, Key, Calendar, MapPin, Tag, DollarSign, FileText, Info } from 'lucide-react';
import './ViewExpenseModal.css';

function ViewExpenseModal({ expense, onClose }) {
  if (!expense) return null;

  return (
    <div className="vex-modal-overlay fade-in">
      <div className="vex-modal-container slide-down">
        <div className="vex-modal-header">
          <h3 className="vex-modal-title">
            <Info size={20} className="title-icon" /> 
            Expense Details
          </h3>
          <button className="vex-modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        
        <div className="vex-modal-body">
          <div className="vex-info-grid">
            {/* Date */}
            <div className="vex-info-item">
              <div className="vex-info-icon-wrap date-bg">
                <Calendar size={18} />
              </div>
              <div className="vex-info-content">
                <span className="vex-info-label">Date</span>
                <span className="vex-info-value">{expense.date}</span>
              </div>
            </div>

            {/* Reference */}
            <div className="vex-info-item">
              <div className="vex-info-icon-wrap ref-bg">
                <Key size={18} />
              </div>
              <div className="vex-info-content">
                <span className="vex-info-label">Reference No</span>
                <span className="vex-info-value">{expense.referenceNo}</span>
              </div>
            </div>

            {/* Warehouse */}
            <div className="vex-info-item">
              <div className="vex-info-icon-wrap warehouse-bg">
                <MapPin size={18} />
              </div>
              <div className="vex-info-content">
                <span className="vex-info-label">Warehouse</span>
                <span className="vex-info-value">{expense.warehouse}</span>
              </div>
            </div>

            {/* Category */}
            <div className="vex-info-item">
              <div className="vex-info-icon-wrap category-bg">
                <Tag size={18} />
              </div>
              <div className="vex-info-content">
                <span className="vex-info-label">Category</span>
                <span className="vex-info-value">{expense.category}</span>
              </div>
            </div>

            {/* Amount */}
            <div className="vex-info-item">
              <div className="vex-info-icon-wrap amount-bg">
                <DollarSign size={18} />
              </div>
              <div className="vex-info-content">
                <span className="vex-info-label">Amount</span>
                <span className="vex-info-value font-bold text-lg">${expense.amount}</span>
              </div>
            </div>
          </div>

          <div className="vex-info-divider"></div>

          {/* Note */}
          <div className="vex-note-section">
            <div className="vex-note-header">
              <FileText size={18} className="text-gray-400" />
              <span className="vex-info-label">Note</span>
            </div>
            <div className="vex-note-content">
              {expense.note || 'No additional notes provided.'}
            </div>
          </div>
        </div>
        
        <div className="vex-modal-footer">
          <button type="button" className="vex-btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewExpenseModal;
