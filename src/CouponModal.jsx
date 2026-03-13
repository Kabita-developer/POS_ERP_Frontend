import React, { useState } from 'react';
import { X, Ticket, CheckCircle2, ArrowRight } from 'lucide-react';
import './CouponModal.css';

function CouponModal({ onClose, onApply }) {
    const [couponCode, setCouponCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (couponCode.trim()) {
            onApply(couponCode);
            onClose();
        }
    };

    return (
        <div className="cpn-overlay fade-in" onClick={onClose}>
            <div className="cpn-container scale-in" onClick={(e) => e.stopPropagation()}>

                {/* ─── Header ─── */}
                <div className="cpn-header">
                    <div className="cpn-header-left">
                        <div className="cpn-header-icon">
                            <Ticket size={20} />
                        </div>
                        <div>
                            <h2 className="cpn-title">Coupon Code</h2>
                            <p className="cpn-subtitle">Enter your code to get a discount</p>
                        </div>
                    </div>
                    <button className="cpn-close-btn" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* ─── Body ─── */}
                <div className="cpn-body">
                    <form onSubmit={handleSubmit} className="cpn-form">
                        <div className="cpn-input-group">
                            <label className="cpn-label">Discount Coupon</label>
                            <div className="cpn-input-wrapper">
                                <input
                                    type="text"
                                    placeholder="e.g. SAVE20, SUMMER50"
                                    className="cpn-input"
                                    autoFocus
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                />
                                <div className="cpn-input-glow" />
                            </div>
                        </div>

                        <div className="cpn-actions">
                            <button type="button" className="cpn-btn-cancel" onClick={onClose}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`cpn-btn-submit ${couponCode.trim() ? 'active' : 'disabled'}`}
                                disabled={!couponCode.trim()}
                            >
                                <CheckCircle2 size={16} />
                                Apply Coupon
                                <ArrowRight size={14} className="cpn-arrow" />
                            </button>
                        </div>
                    </form>
                </div>

                {/* ─── Hint Banner ─── */}
                <div className="cpn-hint">
                    <span>* Only one coupon can be applied per order.</span>
                </div>
            </div>
        </div>
    );
}

export default CouponModal;
