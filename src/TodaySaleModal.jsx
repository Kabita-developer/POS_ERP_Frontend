import React from 'react';
import {
    X,
    ShoppingBasket,
    TrendingUp,
    Banknote,
    CreditCard,
    FileSignature,
    Gift,
    Landmark,
    Smartphone,
    RotateCcw,
    Receipt,
    Wallet,
    ArrowDownLeft,
    ArrowUpRight,
    DollarSign,
} from 'lucide-react';
import './TodaySaleModal.css';

const saleData = [
    { label: 'Total Sale Amount', value: 0, icon: <TrendingUp size={16} />, accent: 'accent-blue', highlight: true },
    { label: 'Cash Payment', value: 0, icon: <Banknote size={16} />, accent: 'accent-green' },
    { label: 'Credit Card Payment', value: 0, icon: <CreditCard size={16} />, accent: 'accent-purple' },
    { label: 'Cheque Payment', value: 0, icon: <FileSignature size={16} />, accent: 'accent-indigo' },
    { label: 'Gift Card Payment', value: 0, icon: <Gift size={16} />, accent: 'accent-pink' },
    { label: 'Deposit Payment', value: 0, icon: <Landmark size={16} />, accent: 'accent-orange' },
    { label: 'Paypal Payment', value: 0, icon: <Smartphone size={16} />, accent: 'accent-sky' },
    { label: 'Total Payment', value: 0, icon: <Receipt size={16} />, accent: 'accent-teal', separator: true },
    { label: 'Total Sale Return', value: 0, icon: <RotateCcw size={16} />, accent: 'accent-red' },
    { label: 'Total Expense', value: 0, icon: <ArrowUpRight size={16} />, accent: 'accent-amber' },
];

function TodaySaleModal({ onClose }) {
    const totalCash = 0;

    return (
        <div className="tsm-overlay fade-in" onClick={onClose}>
            <div className="tsm-container scale-in" onClick={(e) => e.stopPropagation()}>

                {/* ─── Header ─── */}
                <div className="tsm-header">
                    <div className="tsm-header-left">
                        <div className="tsm-header-icon">
                            <ShoppingBasket size={20} />
                        </div>
                        <div>
                            <h2 className="tsm-title">Today's Sale</h2>
                            <p className="tsm-subtitle">Real-time transaction &amp; payment summary</p>
                        </div>
                    </div>
                    <button className="tsm-close-btn" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* ─── Alert Banner ─── */}
                <div className="tsm-alert">
                    <ArrowDownLeft size={14} className="tsm-alert-icon" />
                    <span>Please review the transaction and payments.</span>
                </div>

                {/* ─── Body ─── */}
                <div className="tsm-body">
                    {saleData.map((item, idx) => (
                        <React.Fragment key={idx}>
                            {item.separator && <div className="tsm-separator" />}
                            <div className={`tsm-row ${item.highlight ? 'tsm-row--highlight' : ''}`}>
                                <div className="tsm-row-left">
                                    <span className={`tsm-row-icon ${item.accent}`}>{item.icon}</span>
                                    <span className="tsm-row-label">{item.label}</span>
                                </div>
                                <span className={`tsm-row-value ${item.highlight ? 'value-highlight' : ''}`}>
                                    {item.value.toFixed(2)}
                                </span>
                            </div>
                        </React.Fragment>
                    ))}

                    {/* Total Cash ─ special footer row */}
                    <div className="tsm-total-row">
                        <div className="tsm-row-left">
                            <span className="tsm-row-icon accent-emerald">
                                <Wallet size={17} />
                            </span>
                            <span className="tsm-total-label">Total Cash</span>
                        </div>
                        <span className="tsm-total-value">
                            <DollarSign size={14} className="dollar-sign" />
                            {totalCash.toFixed(2)}
                        </span>
                    </div>
                </div>

                {/* ─── Footer ─── */}
                <div className="tsm-footer">
                    <button className="tsm-btn-close" onClick={onClose}>
                        <X size={15} />
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodaySaleModal;
