import React, { useState } from 'react';
import { X, Truck, DollarSign, CheckCircle2 } from 'lucide-react';
import './ShippingModal.css';

function ShippingModal({ onClose, onApply }) {
    const [shippingCost, setShippingCost] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (shippingCost.trim() !== '') {
            onApply(parseFloat(shippingCost));
            onClose();
        }
    };

    return (
        <div className="shp-overlay fade-in" onClick={onClose}>
            <div className="shp-container scale-in" onClick={(e) => e.stopPropagation()}>

                {/* ─── Header ─── */}
                <div className="shp-header">
                    <div className="shp-header-left">
                        <div className="shp-header-icon">
                            <Truck size={20} />
                        </div>
                        <div>
                            <h2 className="shp-title">Shipping Cost</h2>
                            <p className="shp-subtitle">Add shipping charges to the order</p>
                        </div>
                    </div>
                    <button className="shp-close-btn" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* ─── Body ─── */}
                <div className="shp-body">
                    <form onSubmit={handleSubmit} className="shp-form">
                        <div className="shp-input-group">
                            <label className="shp-label">Shipping Amount</label>
                            <div className="shp-input-wrapper">
                                <div className="shp-input-icon">
                                    <DollarSign size={18} />
                                </div>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="shp-input"
                                    autoFocus
                                    value={shippingCost}
                                    onChange={(e) => setShippingCost(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleSubmit(e);
                                    }}
                                />
                                <div className="shp-input-glow" />
                            </div>
                        </div>

                        <div className="shp-actions">
                            <button type="button" className="shp-btn-cancel" onClick={onClose}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`shp-btn-submit ${shippingCost.trim() !== '' ? 'active' : 'disabled'}`}
                                disabled={shippingCost.trim() === ''}
                            >
                                <CheckCircle2 size={16} />
                                Update Shipping
                            </button>
                        </div>
                    </form>
                </div>

                {/* ─── Footer Tip ─── */}
                <div className="shp-footer-tip">
                    <span>This cost will be added to the grand total.</span>
                </div>
            </div>
        </div>
    );
}

export default ShippingModal;
