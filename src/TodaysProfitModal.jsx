import React, { useState } from 'react';
import {
    X,
    LineChart,
    ChevronDown,
    Warehouse,
    TrendingUp,
    TrendingDown,
    Receipt,
    DollarSign,
    BarChart2,
} from 'lucide-react';
import './TodaysProfitModal.css';

const warehouses = ['All Warehouse', 'Main Warehouse', 'rrrr', 'gudam', 'tyuy', 'yui'];

const profitRows = [
    {
        label: 'Product Revenue',
        value: 0,
        icon: <TrendingUp size={15} />,
        accent: 'tpm-accent-green',
        desc: 'Total sales collected today',
    },
    {
        label: 'Product Cost',
        value: 0,
        icon: <TrendingDown size={15} />,
        accent: 'tpm-accent-red',
        desc: 'Cost of goods sold',
    },
    {
        label: 'Expense',
        value: 0,
        icon: <Receipt size={15} />,
        accent: 'tpm-accent-orange',
        desc: 'Operational expenses',
    },
];

function TodaysProfitModal({ onClose }) {
    const [selectedWarehouse, setSelectedWarehouse] = useState('All Warehouse');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const profit = 0;

    return (
        <div className="tpm-overlay fade-in" onClick={onClose}>
            <div className="tpm-container scale-in" onClick={(e) => e.stopPropagation()}>

                {/* ─── Header ─── */}
                <div className="tpm-header">
                    <div className="tpm-header-left">
                        <div className="tpm-header-icon">
                            <LineChart size={20} />
                        </div>
                        <div>
                            <h2 className="tpm-title">Today's Profit</h2>
                            <p className="tpm-subtitle">Sales performance &amp; profit breakdown</p>
                        </div>
                    </div>
                    <button className="tpm-close-btn" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* ─── Body ─── */}
                <div className="tpm-body">

                    {/* Warehouse Dropdown */}
                    <div className="tpm-dropdown-wrap">
                        <div
                            className={`tpm-dropdown-trigger ${isDropdownOpen ? 'open' : ''}`}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            <div className="tpm-dropdown-left">
                                <Warehouse size={15} className="tpm-dropdown-icon" />
                                <span>{selectedWarehouse}</span>
                            </div>
                            <ChevronDown size={15} className={`tpm-chevron ${isDropdownOpen ? 'rotated' : ''}`} />
                        </div>

                        {isDropdownOpen && (
                            <div className="tpm-dropdown-menu">
                                {warehouses.map((wh) => (
                                    <div
                                        key={wh}
                                        className={`tpm-dropdown-item ${selectedWarehouse === wh ? 'active' : ''}`}
                                        onClick={() => {
                                            setSelectedWarehouse(wh);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        {selectedWarehouse === wh && (
                                            <span className="tpm-check">✓</span>
                                        )}
                                        {wh}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Stat Cards */}
                    <div className="tpm-stat-cards">
                        {profitRows.map((row, idx) => (
                            <div key={idx} className={`tpm-stat-card ${row.accent}`}>
                                <div className="tpm-stat-icon">{row.icon}</div>
                                <div className="tpm-stat-info">
                                    <span className="tpm-stat-label">{row.label}</span>
                                    <span className="tpm-stat-desc">{row.desc}</span>
                                </div>
                                <span className="tpm-stat-value">{row.value.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="tpm-divider" />

                    {/* Profit Total Row */}
                    <div className="tpm-profit-row">
                        <div className="tpm-profit-left">
                            <div className="tpm-profit-icon">
                                <BarChart2 size={18} />
                            </div>
                            <div>
                                <span className="tpm-profit-label">Net Profit</span>
                                <span className="tpm-profit-sub">Revenue − Cost − Expense</span>
                            </div>
                        </div>
                        <div className="tpm-profit-value-wrap">
                            <DollarSign size={14} className="tpm-dollar" />
                            <span className="tpm-profit-value">{profit.toFixed(2)}</span>
                        </div>
                    </div>

                </div>

                {/* ─── Footer ─── */}
                <div className="tpm-footer">
                    <button className="tpm-btn-close" onClick={onClose}>
                        <X size={14} />
                        Close
                    </button>
                </div>

            </div>
        </div>
    );
}

export default TodaysProfitModal;
