import React, { useState } from 'react';
import './PurchaseList.css';
import { 
    Plus, 
    Upload, 
    FileText, 
    Copy, 
    FileSpreadsheet, 
    Printer, 
    X, 
    Eye, 
    Search,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    MoreVertical,
    Calendar,
    ArrowUpCircle,
    Check
} from 'lucide-react';

const PurchaseList = ({ onAddPurchase, onImportPurchase }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [showVisibility, setShowVisibility] = useState(false);
    
    // Column Visibility states
    const [visibleColumns, setVisibleColumns] = useState([
        'Date', 'Reference', 'Supplier', 'Purchase Status', 
        'Grand Total', 'Returned Amount', 'Paid', 'Due', 
        'Payment Status', 'Action'
    ]);

    const toggleColumn = (col) => {
        setVisibleColumns(prev => 
            prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
        );
    };

    const isVisible = (col) => visibleColumns.includes(col);
    
    // Filter states
    const [dateRange, setDateRange] = useState('2025-03-18 To 2026-03-18');
    const [warehouse, setWarehouse] = useState('All');
    const [purchaseStatus, setPurchaseStatus] = useState('All');
    const [paymentStatus, setPaymentStatus] = useState('All');

    // Mock data based on the image's structure
    const [purchases, setPurchases] = useState([
        { 
            id: 1, 
            date: '2026-03-18', 
            reference: 'PR-20260318-001', 
            supplier: 'Supplier Alpha', 
            purchaseStatus: 'Received', 
            grandTotal: 1540.25, 
            returnedAmount: 0.00, 
            paid: 1540.25, 
            due: 0.00, 
            paymentStatus: 'Paid' 
        },
        { 
            id: 2, 
            date: '2026-03-17', 
            reference: 'PR-20260317-005', 
            supplier: 'Beta Supplies Inc.', 
            purchaseStatus: 'Pending', 
            grandTotal: 850.00, 
            returnedAmount: 50.00, 
            paid: 0.00, 
            due: 800.00, 
            paymentStatus: 'Due' 
        },
        { 
            id: 3, 
            date: '2026-03-16', 
            reference: 'PR-20260316-012', 
            supplier: 'Gamma Trading', 
            purchaseStatus: 'Partial', 
            grandTotal: 2200.50, 
            returnedAmount: 0.00, 
            paid: 1100.00, 
            due: 1100.50, 
            paymentStatus: 'Partial' 
        }
    ]);

    // Filtering logic
    const filteredPurchases = purchases.filter(purchase => {
        const lowerSearch = searchTerm.toLowerCase();
        
        // Search filter
        const matchesSearch = 
            purchase.reference.toLowerCase().includes(lowerSearch) ||
            purchase.supplier.toLowerCase().includes(lowerSearch) ||
            purchase.purchaseStatus.toLowerCase().includes(lowerSearch) ||
            purchase.paymentStatus.toLowerCase().includes(lowerSearch);
        
        // Dropdown filters
        const matchesWarehouse = warehouse === 'All' || true; // Mock: assuming all match for now
        const matchesPurchaseStatus = purchaseStatus === 'All' || purchase.purchaseStatus === purchaseStatus;
        const matchesPaymentStatus = paymentStatus === 'All' || purchase.paymentStatus === paymentStatus;

        return matchesSearch && matchesWarehouse && matchesPurchaseStatus && matchesPaymentStatus;
    });

    const totals = filteredPurchases.reduce((acc, curr) => ({
        grandTotal: acc.grandTotal + curr.grandTotal,
        returnedAmount: acc.returnedAmount + curr.returnedAmount,
        paid: acc.paid + curr.paid,
        due: acc.due + curr.due
    }), { grandTotal: 0, returnedAmount: 0, paid: 0, due: 0 });

    return (
        <div className="purchase-container">
            {/* Filter Card */}
            <div className="filter-card">
                <h1 className="purchase-list-title">Purchase List</h1>
                <div className="filters-grid">
                    <div className="filter-item">
                        <label>Date</label>
                        <div className="search-input-inner">
                            <Calendar size={18} className="search-icon-inside" />
                            <input 
                                type="text" 
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="filter-item">
                        <label>Warehouse</label>
                        <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
                            <option value="All">All Warehouse</option>
                            <option value="Main">Main Warehouse</option>
                            <option value="Retail">Retail Outlet</option>
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>Purchase Status</label>
                        <select value={purchaseStatus} onChange={(e) => setPurchaseStatus(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Received">Received</option>
                            <option value="Partial">Partial</option>
                            <option value="Pending">Pending</option>
                            <option value="Ordered">Ordered</option>
                        </select>
                    </div>
                    <div className="filter-item">
                        <label>Payment Status</label>
                        <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Paid">Paid</option>
                            <option value="Partial">Partial</option>
                            <option value="Due">Due</option>
                        </select>
                    </div>
                </div>
                <button className="btn-submit">Submit</button>
            </div>

            {/* Action Buttons */}
            <div className="purchase-header-actions">
                <button className="btn-add-purchase" onClick={onAddPurchase}>
                    <Plus size={18} />
                    <span>Add Purchase</span>
                </button>
                <button className="btn-import-purchase" onClick={onImportPurchase}>
                    <ArrowUpCircle size={18} />
                    <span>Import Purchase</span>
                </button>
            </div>

            {/* Table Controls */}
            <div className="table-controls-card">
                <div className="controls-row">
                    <div className="records-per-page">
                        <select 
                            value={recordsPerPage} 
                            onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <span>records per page</span>
                    </div>

                    <div className="search-box-wrapper">
                        <span>Search</span>
                        <div className="search-input-inner">
                            <input 
                                type="text" 
                                placeholder="" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="export-buttons">
                        <button className="export-btn pdf"><FileText size={18} /></button>
                        <button className="export-btn copy"><Copy size={18} /></button>
                        <button className="export-btn excel"><FileSpreadsheet size={18} /></button>
                        <button className="export-btn print"><Printer size={18} /></button>
                        <button className="export-btn delete"><X size={18} /></button>
                        <div className="visibility-popover">
                            <button className="export-btn view" onClick={() => setShowVisibility(!showVisibility)}>
                                <Eye size={18} />
                            </button>
                            {showVisibility && (
                                <div className="column-dropdown">
                                    {[
                                        'Date', 'Reference', 'Supplier', 'Purchase Status', 
                                        'Grand Total', 'Returned Amount', 'Paid', 'Due', 
                                        'Payment Status', 'Action'
                                    ].map(col => (
                                        <div 
                                            key={col} 
                                            className={`column-item ${isVisible(col) ? 'active' : ''}`}
                                            onClick={() => toggleColumn(col)}
                                        >
                                            <span className="checkbox-indicator">
                                                {isVisible(col) && <Check size={14} />}
                                            </span>
                                            {col}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="table-container">
                <table className="purchase-table">
                    <thead>
                        <tr>
                            <th className="checkbox-col"><input type="checkbox" /></th>
                            {isVisible('Date') && <th>Date <span className="sort-icon">⇅</span></th>}
                            {isVisible('Reference') && <th>Reference <span className="sort-icon">⇅</span></th>}
                            {isVisible('Supplier') && <th>Supplier <span className="sort-icon">⇅</span></th>}
                            {isVisible('Purchase Status') && <th>Purchase Status</th>}
                            {isVisible('Grand Total') && <th>Grand Total <span className="sort-icon">⇅</span></th>}
                            {isVisible('Returned Amount') && <th>Returned Amount <span className="sort-icon">⇅</span></th>}
                            {isVisible('Paid') && <th>Paid</th>}
                            {isVisible('Due') && <th>Due</th>}
                            {isVisible('Payment Status') && <th>Payment Status</th>}
                            {isVisible('Action') && <th className="text-right">Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPurchases.length > 0 ? (
                            filteredPurchases.map((purchase) => (
                                <tr key={purchase.id}>
                                    <td><input type="checkbox" /></td>
                                    {isVisible('Date') && <td>{purchase.date}</td>}
                                    {isVisible('Reference') && <td>{purchase.reference}</td>}
                                    {isVisible('Supplier') && <td>{purchase.supplier}</td>}
                                    {isVisible('Purchase Status') && (
                                        <td>
                                            <span className={`status-badge ${purchase.purchaseStatus.toLowerCase()}`}>
                                                {purchase.purchaseStatus}
                                            </span>
                                        </td>
                                    )}
                                    {isVisible('Grand Total') && <td>{purchase.grandTotal.toFixed(2)}</td>}
                                    {isVisible('Returned Amount') && <td>{purchase.returnedAmount.toFixed(2)}</td>}
                                    {isVisible('Paid') && <td>{purchase.paid.toFixed(2)}</td>}
                                    {isVisible('Due') && <td>{purchase.due.toFixed(2)}</td>}
                                    {isVisible('Payment Status') && (
                                        <td>
                                            <span className={`payment-badge ${purchase.paymentStatus.toLowerCase()}`}>
                                                {purchase.paymentStatus}
                                            </span>
                                        </td>
                                    )}
                                    {isVisible('Action') && (
                                        <td className="text-right">
                                            <button className="action-btn">
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="text-center py-8">No data available in table</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="checkbox-col"></th>
                            {isVisible('Date') && <th>Total</th>}
                            {isVisible('Reference') && <th>{!isVisible('Date') ? 'Total' : ''}</th>}
                            {isVisible('Supplier') && <th>{(!isVisible('Date') && !isVisible('Reference')) ? 'Total' : ''}</th>}
                            {isVisible('Purchase Status') && <th>{(!isVisible('Date') && !isVisible('Reference') && !isVisible('Supplier')) ? 'Total' : ''}</th>}
                            {isVisible('Grand Total') && <th>{totals.grandTotal.toFixed(2)}</th>}
                            {isVisible('Returned Amount') && <th>{totals.returnedAmount.toFixed(2)}</th>}
                            {isVisible('Paid') && <th>{totals.paid.toFixed(2)}</th>}
                            {isVisible('Due') && <th>{totals.due.toFixed(2)}</th>}
                            {isVisible('Payment Status') && <th></th>}
                            {isVisible('Action') && <th></th>}
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Pagination */}
            <div className="purchase-footer">
                <div className="showing-info">
                    Showing {filteredPurchases.length > 0 ? '1' : '0'} to {filteredPurchases.length} of {filteredPurchases.length} entries (filtered from {purchases.length} total)
                </div>
                <div className="pagination">
                    <button className="page-btn disabled"><ChevronLeft size={18} /></button>
                    <button className="page-btn active">1</button>
                    <button className="page-btn disabled"><ChevronRight size={18} /></button>
                </div>
            </div>
        </div>
    );
};

export default PurchaseList;
