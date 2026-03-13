import React, { useState } from 'react';
import { X, CreditCard, DollarSign, ChevronDown, CheckCircle2, FileText, StickyNote, UserSquare2 } from 'lucide-react';
import './FinalizeSaleCardModal.css';

const paidByOptions = [
    { id: 'credit_card', name: 'Credit Card' },
    { id: 'debit_card', name: 'Debit Card' }
];

function FinalizeSaleCardModal({ onClose, totalAmount = '5236.00', onApply }) {
    const [receivedAmount, setReceivedAmount] = useState(totalAmount);
    const [payingAmount, setPayingAmount] = useState(totalAmount);
    const [paidBy, setPaidBy] = useState(paidByOptions[0]);
    const [isPaidByOpen, setIsPaidByOpen] = useState(false);

    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');

    const [paymentNote, setPaymentNote] = useState('');
    const [saleNote, setSaleNote] = useState('');
    const [staffNote, setStaffNote] = useState('');

    const change = Math.max(0, parseFloat(receivedAmount || 0) - parseFloat(payingAmount || 0)).toFixed(2);

    const handleSubmit = (e) => {
        e.preventDefault();
        onApply({
            receivedAmount,
            payingAmount,
            paidBy: paidBy.id,
            cardNumber,
            paymentNote,
            saleNote,
            staffNote
        });
        onClose();
    };

    return (
        <div className="fs-overlay fade-in" onClick={onClose}>
            <div className="fs-container scale-in" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="fs-header">
                    <div className="fs-header-left">
                        <div className="fs-header-icon">
                            <CreditCard size={20} />
                        </div>
                        <div>
                            <h2 className="fs-title">Finalize Sale</h2>
                            <p className="fs-subtitle">Process credit/debit card payment</p>
                        </div>
                    </div>
                    <button type="button" className="fs-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="fs-body">
                    <form onSubmit={handleSubmit}>
                        <div className="fs-grid-2">
                            {/* Received Amount */}
                            <div className="fs-field">
                                <label className="fs-label">Received Amount <span>*</span></label>
                                <div className="fs-input-icon-wrapper">
                                    <DollarSign size={16} className="fs-input-icon" />
                                    <input
                                        type="number"
                                        className="fs-input pl-10"
                                        value={receivedAmount}
                                        onChange={(e) => setReceivedAmount(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Paying Amount */}
                            <div className="fs-field">
                                <label className="fs-label">Paying Amount <span>*</span></label>
                                <div className="fs-input-icon-wrapper">
                                    <DollarSign size={16} className="fs-input-icon" />
                                    <input
                                        type="number"
                                        className="fs-input pl-10 highlight"
                                        value={payingAmount}
                                        onChange={(e) => setPayingAmount(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Change */}
                            <div className="fs-field">
                                <label className="fs-label">Change :</label>
                                <div className="fs-value-display">
                                    <DollarSign size={16} />
                                    <span>{change}</span>
                                </div>
                            </div>

                            {/* Paid By */}
                            <div className="fs-field">
                                <label className="fs-label">Paid By</label>
                                <div className="fs-dropdown-wrapper">
                                    <div
                                        className={`fs-dropdown-trigger ${isPaidByOpen ? 'active' : ''}`}
                                        onClick={() => setIsPaidByOpen(!isPaidByOpen)}
                                    >
                                        <span>{paidBy.name}</span>
                                        <ChevronDown size={18} className={isPaidByOpen ? 'rotated' : ''} />
                                    </div>
                                    {isPaidByOpen && (
                                        <div className="fs-dropdown-menu">
                                            {paidByOptions.map(option => (
                                                <div
                                                    key={option.id}
                                                    className={`fs-dropdown-item ${paidBy.id === option.id ? 'selected' : ''}`}
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

                        {/* Credit Card Input UI */}
                        <div className="fs-card-wrapper mt-4">
                            <div className="fs-card-input-group">
                                <div className="fs-card-icon">
                                    <CreditCard size={20} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Card number"
                                    className="fs-card-input main-input"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="MM / YY"
                                    className="fs-card-input exp-input"
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="CVC"
                                    className="fs-card-input cvc-input"
                                    value={cvc}
                                    onChange={(e) => setCvc(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Payment Note */}
                        <div className="fs-field mt-4 border-top">
                            <label className="fs-label"><FileText size={14} /> Payment Note</label>
                            <textarea
                                className="fs-textarea"
                                rows="2"
                                value={paymentNote}
                                onChange={(e) => setPaymentNote(e.target.value)}
                            />
                        </div>

                        <div className="fs-grid-2 mt-4">
                            {/* Sale Note */}
                            <div className="fs-field">
                                <label className="fs-label"><StickyNote size={14} /> Sale Note</label>
                                <textarea
                                    className="fs-textarea"
                                    rows="3"
                                    value={saleNote}
                                    onChange={(e) => setSaleNote(e.target.value)}
                                />
                            </div>

                            {/* Staff Note */}
                            <div className="fs-field">
                                <label className="fs-label"><UserSquare2 size={14} /> Staff Note</label>
                                <textarea
                                    className="fs-textarea"
                                    rows="3"
                                    value={staffNote}
                                    onChange={(e) => setStaffNote(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="fs-actions mt-6">
                            <button type="button" className="fs-btn-cancel" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="fs-btn-submit">
                                <CheckCircle2 size={18} />
                                Submit Payment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FinalizeSaleCardModal;
