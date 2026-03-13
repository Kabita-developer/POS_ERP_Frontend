import React, { useState } from 'react';
import { X, Edit, Trash2 } from 'lucide-react';
import './RecentTransactionModal.css';

const dummySales = [
    { id: 1, date: '30-06-2025', reference: 'posr-20250630-072148', customer: 'test', total: '492.8' },
    { id: 2, date: '30-06-2025', reference: 'posr-20250630-071554', customer: 'test', total: '56.6' },
    { id: 3, date: '30-06-2025', reference: 'posr-20250630-071543', customer: 'test', total: '56.6' },
    { id: 4, date: '30-06-2025', reference: 'posr-20250630-071542', customer: 'test', total: '56.6' },
    { id: 5, date: '22-04-2025', reference: 'posr-20250422-011157', customer: 'test', total: '369.6' },
    { id: 6, date: '14-04-2025', reference: 'posr-20250414-094945', customer: 'test', total: '61.6' },
    { id: 7, date: '10-04-2025', reference: 'posr-20250410-063724', customer: 'test', total: '123.2' },
];

const dummyDrafts = [
    { id: 8, date: '28-06-2025', reference: 'drft-20250628-111111', customer: 'walk-in', total: '15.0' },
    { id: 9, date: '25-06-2025', reference: 'drft-20250625-222222', customer: 'john doe', total: '120.5' },
];

function RecentTransactionModal({ onClose }) {
    const [activeTab, setActiveTab] = useState('sale');

    const data = activeTab === 'sale' ? dummySales : dummyDrafts;

    return (
        <div className="rtm-overlay fade-in" onClick={onClose}>
            <div className="rtm-container scale-in" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="rtm-header">
                    <div className="rtm-header-left">
                        <h2 className="rtm-title">Recent Transaction</h2>
                        <span className="rtm-badge">Latest 10</span>
                    </div>
                    <button type="button" className="rtm-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="rtm-tabs-container">
                    <button
                        className={`rtm-tab ${activeTab === 'sale' ? 'active' : ''}`}
                        onClick={() => setActiveTab('sale')}
                    >
                        Sale
                    </button>
                    <button
                        className={`rtm-tab ${activeTab === 'draft' ? 'active' : ''}`}
                        onClick={() => setActiveTab('draft')}
                    >
                        Draft
                    </button>
                </div>

                {/* Body (Table) */}
                <div className="rtm-body">
                    <div className="rtm-table-container">
                        <table className="rtm-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Reference</th>
                                    <th>Customer</th>
                                    <th>Grand Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.date}</td>
                                        <td className="rtm-ref">{item.reference}</td>
                                        <td>{item.customer}</td>
                                        <td className="rtm-amount">{item.total}</td>
                                        <td>
                                            <div className="rtm-actions">
                                                <button className="rtm-action-btn edit" title="Edit">
                                                    <Edit size={14} />
                                                </button>
                                                <button className="rtm-action-btn delete" title="Delete">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {data.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="rtm-empty">No transactions found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecentTransactionModal;
