import React, { useState } from 'react';
import { X, CreditCard, DollarSign, ChevronDown, CheckCircle2, FileText, StickyNote, UserSquare2, Globe } from 'lucide-react';
import './FinalizeSalePaypalModal.css';

const paidByOptions = [
    { id: 'paypal', name: 'PayPal' }
];

function FinalizeSalePaypalModal({ onClose, totalAmount = '5236.00', onApply }) {
    const [receivedAmount, setReceivedAmount] = useState(totalAmount);
    const [payingAmount, setPayingAmount] = useState(totalAmount);
    const [paidBy, setPaidBy] = useState(paidByOptions[0]);
    const [isPaidByOpen, setIsPaidByOpen] = useState(false);

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
            paymentNote,
            saleNote,
            staffNote
        });
        onClose();
    };

    return (
        <div className="fsp-overlay fade-in" onClick={onClose}>
            <div className="fsp-container scale-in" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="fsp-header">
                    <div className="fsp-header-left">
                        <div className="fsp-header-icon">
                            <Globe size={20} />
                        </div>
                        <div>
                            <h2 className="fsp-title">Finalize Sale</h2>
                            <p className="fsp-subtitle">Process online payment via PayPal</p>
                        </div>
                    </div>
                    <button type="button" className="fsp-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="fsp-body">
                    <form onSubmit={handleSubmit}>
                        <div className="fsp-grid-2">
                            {/* Received Amount */}
                            <div className="fsp-field">
                                <label className="fsp-label">Received Amount <span>*</span></label>
                                <div className="fsp-input-icon-wrapper">
                                    <DollarSign size={16} className="fsp-input-icon" />
                                    <input
                                        type="number"
                                        className="fsp-input pl-10"
                                        value={receivedAmount}
                                        onChange={(e) => setReceivedAmount(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Paying Amount */}
                            <div className="fsp-field">
                                <label className="fsp-label">Paying Amount <span>*</span></label>
                                <div className="fsp-input-icon-wrapper">
                                    <DollarSign size={16} className="fsp-input-icon" />
                                    <input
                                        type="number"
                                        className="fsp-input pl-10 highlight"
                                        value={payingAmount}
                                        onChange={(e) => setPayingAmount(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Change */}
                            <div className="fsp-field">
                                <label className="fsp-label">Change :</label>
                                <div className="fsp-value-display">
                                    <DollarSign size={16} />
                                    <span>{change}</span>
                                </div>
                            </div>

                            {/* Paid By */}
                            <div className="fsp-field">
                                <label className="fsp-label">Paid By</label>
                                <div className="fsp-dropdown-wrapper">
                                    <div
                                        className={`fsc-dropdown-trigger ${isPaidByOpen ? 'active' : ''}`}
                                        onClick={() => setIsPaidByOpen(!isPaidByOpen)}
                                    >
                                        <span>{paidBy.name}</span>
                                        <ChevronDown size={18} className={isPaidByOpen ? 'rotated' : ''} />
                                    </div>
                                    {isPaidByOpen && (
                                        <div className="fsp-dropdown-menu">
                                            {paidByOptions.map(option => (
                                                <div
                                                    key={option.id}
                                                    className={`fsp-dropdown-item ${paidBy.id === option.id ? 'selected' : ''}`}
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
                        <div className="fsp-field mt-4">
                            <label className="fsp-label"><FileText size={14} /> Payment Note</label>
                            <textarea
                                className="fsp-textarea"
                                rows="2"
                                value={paymentNote}
                                onChange={(e) => setPaymentNote(e.target.value)}
                            />
                        </div>

                        <div className="fsp-grid-2 mt-4">
                            {/* Sale Note */}
                            <div className="fsp-field">
                                <label className="fsp-label"><StickyNote size={14} /> Sale Note</label>
                                <textarea
                                    className="fsp-textarea"
                                    rows="3"
                                    value={saleNote}
                                    onChange={(e) => setSaleNote(e.target.value)}
                                />
                            </div>

                            {/* Staff Note */}
                            <div className="fsp-field">
                                <label className="fsp-label"><UserSquare2 size={14} /> Staff Note</label>
                                <textarea
                                    className="fsp-textarea"
                                    rows="3"
                                    value={staffNote}
                                    onChange={(e) => setStaffNote(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="fsp-actions mt-6">
                            <button type="submit" className="fsp-btn-submit">
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

export default FinalizeSalePaypalModal;
