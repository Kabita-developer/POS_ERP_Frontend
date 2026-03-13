import React, { useState } from 'react';
import { X, Gift, DollarSign, ChevronDown, CheckCircle2, FileText, StickyNote, UserSquare2 } from 'lucide-react';
import './FinalizeSaleGiftCardModal.css';

const paidByOptions = [
    { id: 'gift_card', name: 'Gift Card' }
];

const giftCardOptions = [
    { id: 'gc_001', name: 'GC-001 ($50.00)' },
    { id: 'gc_002', name: 'GC-002 ($100.00)' },
    { id: 'gc_003', name: 'GC-003 ($250.00)' }
];

function FinalizeSaleGiftCardModal({ onClose, totalAmount = '5236.00', onApply }) {
    const [receivedAmount, setReceivedAmount] = useState(totalAmount);
    const [payingAmount, setPayingAmount] = useState(totalAmount);

    const [paidBy, setPaidBy] = useState(paidByOptions[0]);
    const [isPaidByOpen, setIsPaidByOpen] = useState(false);

    const [selectedGiftCard, setSelectedGiftCard] = useState(null);
    const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);

    const [paymentNote, setPaymentNote] = useState('');
    const [saleNote, setSaleNote] = useState('');
    const [staffNote, setStaffNote] = useState('');

    const change = Math.max(0, parseFloat(receivedAmount || 0) - parseFloat(payingAmount || 0)).toFixed(2);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedGiftCard) {
            alert("Please select a gift card.");
            return;
        }
        onApply({
            receivedAmount,
            payingAmount,
            paidBy: paidBy.id,
            giftCard: selectedGiftCard.id,
            paymentNote,
            saleNote,
            staffNote
        });
        onClose();
    };

    return (
        <div className="fsgc-overlay fade-in" onClick={onClose}>
            <div className="fsgc-container scale-in" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="fsgc-header">
                    <div className="fsgc-header-left">
                        <div className="fsgc-header-icon">
                            <Gift size={20} />
                        </div>
                        <div>
                            <h2 className="fsgc-title">Finalize Sale</h2>
                            <p className="fsgc-subtitle">Process payment via Gift Card</p>
                        </div>
                    </div>
                    <button type="button" className="fsgc-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="fsgc-body">
                    <form onSubmit={handleSubmit}>
                        <div className="fsgc-grid-2">
                            {/* Received Amount */}
                            <div className="fsgc-field">
                                <label className="fsgc-label">Received Amount <span>*</span></label>
                                <div className="fsgc-input-icon-wrapper">
                                    <DollarSign size={16} className="fsgc-input-icon" />
                                    <input
                                        type="number"
                                        className="fsgc-input pl-10"
                                        value={receivedAmount}
                                        onChange={(e) => setReceivedAmount(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Paying Amount */}
                            <div className="fsgc-field">
                                <label className="fsgc-label">Paying Amount <span>*</span></label>
                                <div className="fsgc-input-icon-wrapper">
                                    <DollarSign size={16} className="fsgc-input-icon" />
                                    <input
                                        type="number"
                                        className="fsgc-input pl-10 highlight"
                                        value={payingAmount}
                                        onChange={(e) => setPayingAmount(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Change */}
                            <div className="fsgc-field">
                                <label className="fsgc-label">Change :</label>
                                <div className="fsgc-value-display">
                                    <DollarSign size={16} />
                                    <span>{change}</span>
                                </div>
                            </div>

                            {/* Paid By */}
                            <div className="fsgc-field">
                                <label className="fsgc-label">Paid By</label>
                                <div className="fsgc-dropdown-wrapper">
                                    <div
                                        className={`fsgc-dropdown-trigger ${isPaidByOpen ? 'active' : ''}`}
                                        onClick={() => setIsPaidByOpen(!isPaidByOpen)}
                                    >
                                        <span>{paidBy.name}</span>
                                        <ChevronDown size={18} className={isPaidByOpen ? 'rotated' : ''} />
                                    </div>
                                    {isPaidByOpen && (
                                        <div className="fsgc-dropdown-menu">
                                            {paidByOptions.map(option => (
                                                <div
                                                    key={option.id}
                                                    className={`fsgc-dropdown-item ${paidBy.id === option.id ? 'selected' : ''}`}
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

                        {/* Gift Card Selection */}
                        <div className="fsgc-field mt-4 border-top">
                            <label className="fsgc-label">Gift Card <span>*</span></label>
                            <div className="fsgc-dropdown-wrapper">
                                <div
                                    className={`fsgc-dropdown-trigger full-width ${isGiftCardOpen ? 'active' : ''}`}
                                    onClick={() => setIsGiftCardOpen(!isGiftCardOpen)}
                                >
                                    <span className={!selectedGiftCard ? 'text-muted' : ''}>
                                        {selectedGiftCard ? selectedGiftCard.name : 'Select Gift Card...'}
                                    </span>
                                    <ChevronDown size={18} className={isGiftCardOpen ? 'rotated' : ''} />
                                </div>
                                {isGiftCardOpen && (
                                    <div className="fsgc-dropdown-menu">
                                        {giftCardOptions.map(card => (
                                            <div
                                                key={card.id}
                                                className={`fsgc-dropdown-item ${selectedGiftCard?.id === card.id ? 'selected' : ''}`}
                                                onClick={() => {
                                                    setSelectedGiftCard(card);
                                                    setIsGiftCardOpen(false);
                                                }}
                                            >
                                                <div className="fsgc-gc-option">
                                                    <Gift size={16} />
                                                    <span>{card.name}</span>
                                                </div>
                                                {selectedGiftCard?.id === card.id && <CheckCircle2 size={16} />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment Note */}
                        <div className="fsgc-field mt-4">
                            <label className="fsgc-label"><FileText size={14} /> Payment Note</label>
                            <textarea
                                className="fsgc-textarea"
                                rows="2"
                                value={paymentNote}
                                onChange={(e) => setPaymentNote(e.target.value)}
                            />
                        </div>

                        <div className="fsgc-grid-2 mt-4">
                            {/* Sale Note */}
                            <div className="fsgc-field">
                                <label className="fsgc-label"><StickyNote size={14} /> Sale Note</label>
                                <textarea
                                    className="fsgc-textarea"
                                    rows="3"
                                    value={saleNote}
                                    onChange={(e) => setSaleNote(e.target.value)}
                                />
                            </div>

                            {/* Staff Note */}
                            <div className="fsgc-field">
                                <label className="fsgc-label"><UserSquare2 size={14} /> Staff Note</label>
                                <textarea
                                    className="fsgc-textarea"
                                    rows="3"
                                    value={staffNote}
                                    onChange={(e) => setStaffNote(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="fsgc-actions mt-6">
                            <button type="submit" className="fsgc-btn-submit">
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

export default FinalizeSaleGiftCardModal;
