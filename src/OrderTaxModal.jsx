import React, { useState } from 'react';
import { X, Percent, CheckCircle2, ChevronDown } from 'lucide-react';
import './OrderTaxModal.css';

const taxOptions = [
    { id: 1, name: 'No Tax', value: 0 },
    { id: 2, name: 'VAT 5%', value: 5 },
    { id: 3, name: 'GST 10%', value: 10 },
    { id: 4, name: 'Sales Tax 15%', value: 15 },
];

function OrderTaxModal({ onClose, onApply }) {
    const [selectedTax, setSelectedTax] = useState(taxOptions[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onApply(selectedTax);
        onClose();
    };

    return (
        <div className="otm-overlay fade-in" onClick={onClose}>
            <div className="otm-container scale-in" onClick={(e) => e.stopPropagation()}>

                {/* ─── Header ─── */}
                <div className="otm-header">
                    <div className="otm-header-left">
                        <div className="otm-header-icon">
                            <Percent size={20} />
                        </div>
                        <div>
                            <h2 className="otm-title">Order Tax</h2>
                            <p className="otm-subtitle">Select the applicable tax rate</p>
                        </div>
                    </div>
                    <button className="otm-close-btn" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* ─── Body ─── */}
                <div className="otm-body">
                    <div className="otm-form-group">
                        <label className="otm-label">Tax Rate</label>

                        <div className="otm-dropdown-container">
                            <div
                                className={`otm-dropdown-trigger ${isDropdownOpen ? 'active' : ''}`}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <span>{selectedTax.name}</span>
                                <ChevronDown size={18} className={`otm-chevron ${isDropdownOpen ? 'rotated' : ''}`} />
                            </div>

                            {isDropdownOpen && (
                                <div className="otm-dropdown-menu">
                                    {taxOptions.map((option) => (
                                        <div
                                            key={option.id}
                                            className={`otm-dropdown-item ${selectedTax.id === option.id ? 'selected' : ''}`}
                                            onClick={() => {
                                                setSelectedTax(option);
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            {option.name}
                                            {selectedTax.id === option.id && <CheckCircle2 size={14} className="otm-check" />}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="otm-actions">
                        <button className="otm-btn-cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="otm-btn-submit" onClick={handleSubmit}>
                            Update Tax
                        </button>
                    </div>
                </div>

                {/* ─── Footer Alert ─── */}
                <div className="otm-footer-tip">
                    <span>Tax will be calculated on the total amount.</span>
                </div>
            </div>
        </div>
    );
}

export default OrderTaxModal;
