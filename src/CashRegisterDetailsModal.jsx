import React from 'react';
import './CashRegisterDetailsModal.css';
import { X } from 'lucide-react';

function CashRegisterDetailsModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container fade-in-up" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">Cash Register Details</h3>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="modal-info-banner">
                        <p className="modal-subtitle">Please review the transaction and payments summary for the current register session.</p>
                    </div>

                    <div className="details-list">
                        <div className="detail-item">
                            <span className="detail-label">Cash in Hand:</span>
                            <span className="detail-value">$ 1.00</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Total Sale Amount:</span>
                            <span className="detail-value">$ 5,663.00</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Total Payment:</span>
                            <span className="detail-value">$ 1,881.20</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Cash Payment:</span>
                            <span className="detail-value">$ 1,881.20</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Credit Card Payment:</span>
                            <span className="detail-value">$ 0.00</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Cheque Payment:</span>
                            <span className="detail-value">$ 0.00</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Gift Card Payment:</span>
                            <span className="detail-value">$ 0.00</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Paypal Payment:</span>
                            <span className="detail-value">$ 0.00</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Total Sale Return:</span>
                            <span className="detail-value">$ 0.00</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Total Expense:</span>
                            <span className="detail-value">$ 0.00</span>
                        </div>
                        <div className="detail-item total-summary-row">
                            <span className="detail-label highlight">Total Cash in Register:</span>
                            <span className="detail-value highlight">$ 1,882.20</span>
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn-primary" onClick={onClose}>Close Register</button>
                </div>
            </div>
        </div>
    );
}

export default CashRegisterDetailsModal;
