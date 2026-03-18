import React from 'react';
import { X } from 'lucide-react';
import './CountStockModal.css';

const CountStockModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Stock count submitted');
        onClose();
        alert('Stock count request submitted successfully');
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
            <div 
                className="modal-content count-stock-modal" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="modal-header">
                    <h2>Count Stock</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="modal-body">
                    <p className="required-text">
                        The field labels marked with * are required input fields.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            {/* Warehouse Field */}
                            <div className="form-group">
                                <label>Warehouse *</label>
                                <select required>
                                    <option value="">Select warehouse...</option>
                                    <option value="1">Warehouse 1</option>
                                    <option value="2">Warehouse 2</option>
                                </select>
                            </div>

                            {/* Type Field */}
                            <div className="form-group">
                                <label>Type *</label>
                                <select required>
                                    <option value="full">Full</option>
                                    <option value="partial">Partial</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="modal-footer">
                            <button type="submit" className="submit-btn">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CountStockModal;
