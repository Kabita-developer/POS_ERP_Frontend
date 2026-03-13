import React, { useState } from 'react';
import { X, Banknote, DollarSign, ChevronDown, CheckCircle2, FileText, StickyNote, UserSquare2 } from 'lucide-react';
import './FinalizeSaleCashModal.css';

const paidByOptions = [
    { id: 'cash', name: 'Cash' }
];

const quickCashOptions = [10, 20, 50, 100, 500, 1000];

function FinalizeSaleCashModal({ onClose, totalAmount = '5236.00', onApply }) {
    const [receivedAmount, setReceivedAmount] = useState(totalAmount);
    const [payingAmount, setPayingAmount] = useState(totalAmount);
    const [paidBy, setPaidBy] = useState(paidByOptions[0]);
    const [isPaidByOpen, setIsPaidByOpen] = useState(false);

    const [paymentNote, setPaymentNote] = useState('');
    const [saleNote, setSaleNote] = useState('');
    const [staffNote, setStaffNote] = useState('');

    const change = Math.max(0, parseFloat(receivedAmount || 0) - parseFloat(payingAmount || 0)).toFixed(2);

    const handleQuickCash = (amount) => {
        setReceivedAmount((prev) => (parseFloat(prev || 0) + amount).toFixed(2));
    };

    const clearQuickCash = () => {
        setReceivedAmount('0.00');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onApply({
            receivedAmount,
            payingAmount,
            paidBy: paidBy.id,
            paymentNote,
            saleNote,
            staffNote
        });
        onClose();
    };

    return (
        <div className="fsc-overlay fade-in" onClick={onClose}>
            <div className="fsc-container scale-in" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="fsc-header">
                    <div className="fsc-header-left">
                        <div className="fsc-header-icon">
                            <Banknote size={20} />
                        </div>
                        <div>
                            <h2 className="fsc-title">Finalize Sale</h2>
                            <p className="fsc-subtitle">Process cash payment</p>
                        </div>
                    </div>
                    <button type="button" className="fsc-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="fsc-body">
                    <div className="fsc-content-layout">

                        {/* Left Side: Form */}
                        <div className="fsc-form-section">
                            <form onSubmit={handleSubmit}>
                                <div className="fsc-grid-2">
                                    {/* Received Amount */}
                                    <div className="fsc-field">
                                        <label className="fsc-label">Received Amount <span>*</span></label>
                                        <div className="fsc-input-icon-wrapper">
                                            <DollarSign size={16} className="fsc-input-icon" />
                                            <input
                                                type="number"
                                                step="0.01"
                                                className="fsc-input pl-10 highlight-green"
                                                value={receivedAmount}
                                                onChange={(e) => setReceivedAmount(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Paying Amount */}
                                    <div className="fsc-field">
                                        <label className="fsc-label">Paying Amount <span>*</span></label>
                                        <div className="fsc-input-icon-wrapper">
                                            <DollarSign size={16} className="fsc-input-icon" />
                                            <input
                                                type="number"
                                                className="fsc-input pl-10"
                                                value={payingAmount}
                                                onChange={(e) => setPayingAmount(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Change */}
                                    <div className="fsc-field">
                                        <label className="fsc-label">Change :</label>
                                        <div className="fsc-value-display">
                                            <DollarSign size={16} />
                                            <span>{change}</span>
                                        </div>
                                    </div>

                                    {/* Paid By */}
                                    <div className="fsc-field">
                                        <label className="fsc-label">Paid By</label>
                                        <div className="fsc-dropdown-wrapper">
                                            <div
                                                className={`fsc-dropdown-trigger ${isPaidByOpen ? 'active' : ''}`}
                                                onClick={() => setIsPaidByOpen(!isPaidByOpen)}
                                            >
                                                <span>{paidBy.name}</span>
                                                <ChevronDown size={18} className={isPaidByOpen ? 'rotated' : ''} />
                                            </div>
                                            {isPaidByOpen && (
                                                <div className="fsc-dropdown-menu">
                                                    {paidByOptions.map(option => (
                                                        <div
                                                            key={option.id}
                                                            className={`fsc-dropdown-item ${paidBy.id === option.id ? 'selected' : ''}`}
                                                            onClick={() => {
                                                                setPaidBy(option);
                                                                setIsPaidByOpen(false);
                                                            }}
                                                        >
                                                            {option.name}
                                                            {paidBy.id === option.id && <CheckCircle2 size={16} />}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Note */}
                                <div className="fsc-field mt-4">
                                    <label className="fsc-label"><FileText size={14} /> Payment Note</label>
                                    <textarea
                                        className="fsc-textarea"
                                        rows="2"
                                        value={paymentNote}
                                        onChange={(e) => setPaymentNote(e.target.value)}
                                    />
                                </div>

                                <div className="fsc-grid-2 mt-4">
                                    {/* Sale Note */}
                                    <div className="fsc-field">
                                        <label className="fsc-label"><StickyNote size={14} /> Sale Note</label>
                                        <textarea
                                            className="fsc-textarea"
                                            rows="3"
                                            value={saleNote}
                                            onChange={(e) => setSaleNote(e.target.value)}
                                        />
                                    </div>

                                    {/* Staff Note */}
                                    <div className="fsc-field">
                                        <label className="fsc-label"><UserSquare2 size={14} /> Staff Note</label>
                                        <textarea
                                            className="fsc-textarea"
                                            rows="3"
                                            value={staffNote}
                                            onChange={(e) => setStaffNote(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="fsc-actions mt-6">
                                    <button type="submit" className="fsc-btn-submit">
                                        <CheckCircle2 size={18} />
                                        Submit Payment
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right Side: Quick Cash */}
                        <div className="fsc-quick-cash-section">
                            <h3 className="fsc-qc-title">Quick Cash</h3>
                            <div className="fsc-qc-grid">
                                {quickCashOptions.map(amount => (
                                    <button
                                        key={amount}
                                        className="fsc-qc-btn"
                                        onClick={() => handleQuickCash(amount)}
                                    >
                                        +{amount}
                                    </button>
                                ))}
                                <button className="fsc-qc-btn clear" onClick={clearQuickCash}>
                                    Clear
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default FinalizeSaleCashModal;
