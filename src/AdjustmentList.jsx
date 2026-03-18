import React, { useState } from 'react';
import { 
    Plus, Search, FileText, File, Printer, X, Eye, 
    ChevronLeft, ChevronRight, FileSpreadsheet, ListFilter 
} from 'lucide-react';
import './AdjustmentList.css';

const AdjustmentList = () => {
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    const [showVisibilityMenu, setShowVisibilityMenu] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({
        date: true,
        reference: true,
        warehouse: true,
        products: true,
        note: true,
        action: true
    });

    const toggleColumn = (col) => {
        setVisibleColumns(prev => ({
            ...prev,
            [col]: !prev[col]
        }));
    };


    return (
        <div className="adjustment-list-container">
            <div className="adjustment-card">
                {/* Header Section */}
                <div className="header-actions">
                    <button className="add-adj-btn">
                        <Plus size={18} />
                        Add Adjustment
                    </button>
                </div>

                {/* Table Control Icons Bar */}
                <div className="table-controls">
                    {/* Records Selection Left */}
                    <div className="left-controls">
                        <select 
                            className="records-select"
                            value={recordsPerPage}
                            onChange={(e) => setRecordsPerPage(e.target.value)}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                        <span>records per page</span>
                    </div>

                    {/* Search Field Middle */}
                    <div className="center-controls">
                        <span>Search</span>
                        <input 
                            type="text" 
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Format / Export Icons Right */}
                    <div className="export-buttons">
                        <button className="export-btn pdf" title="Export PDF"><FileText size={16} /></button>
                        <button className="export-btn csv" title="Export CSV"><File size={16} /></button>
                        <button className="export-btn xlsx" title="Export Excel"><FileSpreadsheet size={16} /></button>
                        <button className="export-btn print" title="Print"><Printer size={16} /></button>
                        <button className="export-btn delete" title="Delete Selected"><X size={16} /></button>
                        <div className="visibility-container">
                            <button 
                                className={`export-btn view ${showVisibilityMenu ? 'active' : ''}`} 
                                title="Column Visibility"
                                onClick={() => setShowVisibilityMenu(!showVisibilityMenu)}
                            >
                                <Eye size={16} />
                            </button>
                            
                            {showVisibilityMenu && (
                                <div className="column-visibility-dropdown">
                                    <div className="dropdown-header">Column Visibility</div>
                                    <div className="dropdown-items">
                                        {Object.keys(visibleColumns).map(col => (
                                            <div 
                                                key={col} 
                                                className={`visibility-item ${visibleColumns[col] ? 'active' : ''}`}
                                                onClick={() => toggleColumn(col)}
                                            >
                                                <span className="capitalize">{col}</span>
                                                <div className="toggle-switch">
                                                    <div className="toggle-dot"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* The Main Table Section */}
                <div className="table-container">
                    <table className="adj-table">
                        <thead>
                            <tr>
                                <th className="checkbox-cell">
                                    <input type="checkbox" />
                                </th>
                                {visibleColumns.date && <th className="sortable">Date</th>}
                                {visibleColumns.reference && <th className="sortable">Reference</th>}
                                {visibleColumns.warehouse && <th className="sortable">Warehouse</th>}
                                {visibleColumns.products && <th className="sortable">Products</th>}
                                {visibleColumns.note && <th className="sortable">Note</th>}
                                {visibleColumns.action && <th>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={Object.values(visibleColumns).filter(v => v).length + 1} className="empty-row-text">
                                    No data available in table
                                </td>
                            </tr>
                        </tbody>

                    </table>
                </div>

                {/* Bottom Footer Section */}
                <div className="footer-controls">
                    <div className="entries-info">
                        Showing 0 to 0 of 0 entries
                    </div>
                    <div className="pagination">
                        <button className="page-nav-btn" disabled>
                            <ChevronLeft size={18} />
                        </button>
                        <button className="page-nav-btn" disabled>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdjustmentList;
