import React, { useState } from 'react';
import { X, Tag, ChevronDown, CheckCircle2, CircleDollarSign, Percent as PercentIcon } from 'lucide-react';
import './OrderDiscountModal.css';

const discountTypes = [
    { id: 'flat', name: 'Fixed / Flat', icon: <CircleDollarSign size={16} /> },
    { id: 'percentage', name: 'Percentage %', icon: <PercentIcon size={16} /> },
];

function OrderDiscountModal({ onClose, onApply }) {
    const [discountType, setDiscountType] = useState(discountTypes[0]);
    const [value, setValue] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value) {
            onApply({ type: discountType.id, value: parseFloat(value) });
            onClose();
        }
    };

    return (
        <div className="dsc-overlay fade-in" onClick={onClose}>
            <div className="dsc-container scale-in" onClick={(e) => e.stopPropagation()}>

                {/* ─── Header ─── */}
                <div className="dsc-header">
                    <div className="dsc-header-left">
                        <div className="dsc-header-icon">
                            <Tag size={20} />
                        </div>
                        <div>
                            <h2 className="dsc-title">Order Discount</h2>
                            <p className="dsc-subtitle">Apply a discount to the entire order</p>
                        </div>
                    </div>
                    <button className="dsc-close-btn" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* ─── Body ─── */}
                <div className="dsc-body">
                    <form onSubmit={handleSubmit} className="dsc-form">
                        <div className="dsc-row">
                            {/* Discount Type Dropdown */}
                            <div className="dsc-field">
                                <label className="dsc-label">Discount Type</label>
                                <div className="dsc-dropdown-container">
                                    <div
                                        className={`dsc-dropdown-trigger ${isDropdownOpen ? 'active' : ''}`}
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <div className="dsc-selected-val">
                                            {discountType.icon}
                                            <span>{discountType.name}</span>
                                        </div>
                                        <ChevronDown size={18} className={`dsc-chevron ${isDropdownOpen ? 'rotated' : ''}`} />
                                    </div>

                                    {isDropdownOpen && (
                                        <div className="dsc-dropdown-menu">
                                            {discountTypes.map((type) => (
                                                <div
                                                    key={type.id}
                                                    className={`dsc-dropdown-item ${discountType.id === type.id ? 'selected' : ''}`}
                                                    onClick={() => {
                                                        setDiscountType(type);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                >
                                                    <div className="dsc-item-content">
                                                        {type.icon}
                                                        <span>{type.name}</span>
                                                    </div>
                                                    {discountType.id === type.id && <CheckCircle2 size={14} className="dsc-check" />}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Discount Value Input */}
                            <div className="dsc-field">
                                <label className="dsc-label">Discount Value</label>
                                <div className="dsc-input-wrapper">
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        className="dsc-input"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        autoFocus
                                    />
                                    <div className="dsc-input-suffix">
                                        {discountType.id === 'percentage' ? '%' : '$'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dsc-actions">
                            <button type="button" className="dsc-btn-cancel" onClick={onClose}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`dsc-btn-submit ${value ? 'active' : 'disabled'}`}
                                disabled={!value}
                            >
                                Apply Discount
                            </button>
                        </div>
                    </form>
                </div>

                {/* ─── Footer Alert ─── */}
                <div className="dsc-footer-tip">
                    <span>The discount will be applied to the order subtotal.</span>
                </div>
            </div>
        </div>
    );
}

export default OrderDiscountModal;
