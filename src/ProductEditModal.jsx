import React, { useState } from 'react';
import { X, Package, Hash, Tag, DollarSign, Percent, FileText, ChevronDown, CheckCircle2 } from 'lucide-react';
import './ProductEditModal.css';

const taxOptions = [
    { id: 1, name: 'No Tax', value: 0 },
    { id: 2, name: 'VAT 5%', value: 5 },
    { id: 3, name: 'GST 10%', value: 10 },
    { id: 4, name: 'Sales Tax 15%', value: 15 },
];

function ProductEditModal({ product, onClose, onUpdate }) {
    const [quantity, setQuantity] = useState('1');
    const [discount, setDiscount] = useState('0.00');
    const [price, setPrice] = useState(product?.price?.replace('$', '') || '5236.00');
    const [selectedTax, setSelectedTax] = useState(taxOptions[0]);
    const [imei, setImei] = useState('');
    const [isTaxOpen, setIsTaxOpen] = useState(false);

    const handleUpdate = (e) => {
        e.preventDefault();
        onUpdate({
            ...product,
            quantity,
            discount,
            price,
            tax: selectedTax,
            imei
        });
        onClose();
    };

    return (
        <div className="pedit-overlay fade-in" onClick={onClose}>
            <div className="pedit-container scale-in" onClick={(e) => e.stopPropagation()}>

                {/* ─── Header ─── */}
                <div className="pedit-header">
                    <div className="pedit-header-left">
                        <div className="pedit-header-icon">
                            <Package size={22} />
                        </div>
                        <div>
                            <h2 className="pedit-title">{product?.name || 'Product Detail'} <span className="pedit-code">#{product?.code || '4321'}</span></h2>
                            <p className="pedit-stock">Current Stock: <span className="stock-count">0 Items</span></p>
                        </div>
                    </div>
                    <button className="pedit-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* ─── Body ─── */}
                <div className="pedit-body">
                    <form onSubmit={handleUpdate} className="pedit-form">
                        <div className="pedit-grid">
                            {/* Quantity */}
                            <div className="pedit-field">
                                <label className="pedit-label"><Hash size={14} /> Quantity</label>
                                <input
                                    type="number"
                                    className="pedit-input"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>

                            {/* Discount */}
                            <div className="pedit-field">
                                <label className="pedit-label"><Tag size={14} /> Unit Discount</label>
                                <div className="pedit-input-wrapper">
                                    <input
                                        type="number"
                                        className="pedit-input"
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                    />
                                    <div className="pedit-suffix">%</div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="pedit-field">
                                <label className="pedit-label"><DollarSign size={14} /> Unit Price</label>
                                <div className="pedit-input-wrapper">
                                    <input
                                        type="number"
                                        className="pedit-input"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <div className="pedit-suffix">USD</div>
                                </div>
                            </div>
                        </div>

                        {/* Tax Rate Custom Dropdown */}
                        <div className="pedit-field mt-4">
                            <label className="pedit-label"><Percent size={14} /> Tax Rate</label>
                            <div className="pedit-tax-dropdown">
                                <div
                                    className={`pedit-tax-trigger ${isTaxOpen ? 'active' : ''}`}
                                    onClick={() => setIsTaxOpen(!isTaxOpen)}
                                >
                                    <span>{selectedTax.name}</span>
                                    <ChevronDown size={18} className={isTaxOpen ? 'rotated' : ''} />
                                </div>
                                {isTaxOpen && (
                                    <div className="pedit-tax-menu">
                                        {taxOptions.map(option => (
                                            <div
                                                key={option.id}
                                                className={`pedit-tax-item ${selectedTax.id === option.id ? 'selected' : ''}`}
                                                onClick={() => {
                                                    setSelectedTax(option);
                                                    setIsTaxOpen(false);
                                                }}
                                            >
                                                {option.name}
                                                {selectedTax.id === option.id && <CheckCircle2 size={14} />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* IMEI / Serial */}
                        <div className="pedit-field mt-4">
                            <label className="pedit-label"><FileText size={14} /> IMEI or Serial Numbers</label>
                            <textarea
                                className="pedit-textarea"
                                placeholder="Type imei or serial numbers and separate them by comma. Example: 1001, 2001"
                                value={imei}
                                onChange={(e) => setImei(e.target.value)}
                            />
                        </div>

                        <div className="pedit-actions">
                            <button type="submit" className="pedit-btn-update">
                                <CheckCircle2 size={18} />
                                Update Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProductEditModal;
