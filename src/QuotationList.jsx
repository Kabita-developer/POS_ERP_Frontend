import React, { useState } from 'react';
import './QuotationList.css';
import { 
  Plus, Search, FileText, FileSpreadsheet, 
  Printer, Columns, ChevronLeft, ChevronRight, Edit, Trash2, 
  ChevronDown, Eye, Filter, Calendar, MapPin
} from 'lucide-react';

function QuotationList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [showColumnToggle, setShowColumnToggle] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const [visibleColumns, setVisibleColumns] = useState({
    date: true,
    reference: true,
    warehouse: true,
    biller: true,
    customer: true,
    supplier: true,
    status: true,
    grandTotal: true,
    action: true
  });

  const [quotations, setQuotations] = useState([
    { id: 1, date: '2025-03-20', reference: 'QT-20250320-001', warehouse: 'Main Warehouse', biller: 'Admin', customer: 'Walking Customer', supplier: 'N/A', status: 'Pending', grandTotal: 1250.00 },
    { id: 2, date: '2025-03-18', reference: 'QT-20250318-002', warehouse: 'Store A', biller: 'Manager', customer: 'John Doe', supplier: 'Tech Corp', status: 'Sent', grandTotal: 3400.50 },
  ]);

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <div className="quotation-list-container fade-in">
      {/* Page Title Wrapper */}
      <div className="quotation-card-header">
        <h2 className="quotation-card-title">Quotation List</h2>
      </div>

      {/* Filter Section (Matching image style) */}
      <div className="quotation-filters shadow-premium">
        <div className="filter-row">
          <div className="filter-item">
            <label className="filter-label">Choose Your Date</label>
            <div className="filter-input-wrapper">
              <Calendar size={16} className="filter-icon" />
              <input type="text" placeholder="2025-03-20 To 2026-03-20" className="premium-filter-input" />
            </div>
          </div>
          <div className="filter-item">
            <label className="filter-label">Choose Warehouse</label>
            <div className="filter-input-wrapper">
              <MapPin size={16} className="filter-icon" />
              <select className="premium-filter-select">
                <option>All Warehouse</option>
                <option>Main Warehouse</option>
                <option>Store A</option>
              </select>
            </div>
          </div>
          <button className="premium-submit-btn">Submit</button>
        </div>
      </div>

      {/* Actions & Toolbar */}
      <div className="quotation-actions-row">
        <button className="btn-modern btn-teal">
          <Plus size={16} /> Add Quotation
        </button>

        <div className="table-toolbar-right">
          <div className="records-per-page">
            <select 
              value={recordsPerPage} 
              onChange={(e) => setRecordsPerPage(Number(e.target.value))}
              className="records-select"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="records-text">records per page</span>
          </div>

          <div className="search-box-wrapper">
            <span className="search-label">Search</span>
            <div className="search-input-group">
              <Search size={16} className="search-icon-inline" />
              <input 
                type="text" 
                className="search-input-modern"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="export-buttons-group">
            <button className="export-btn btn-red" title="Export PDF"><FileText size={16} /></button>
            <button className="export-btn btn-gray" title="Export Excel"><FileSpreadsheet size={16} /></button>
            <button className="export-btn btn-orange" title="Export CSV"><FileText size={16} /></button>
            <button className="export-btn btn-blue" title="Print List"><Printer size={16} /></button>
            <button className="export-btn btn-dark-red" title="Delete Selected"><Trash2 size={16} /></button>
            
            <div className="column-visibility-container">
              <button 
                className="export-btn btn-purple" 
                onClick={() => setShowColumnToggle(!showColumnToggle)}
              >
                <Columns size={16} />
              </button>
              {showColumnToggle && (
                <div className="cv-dropdown-premium fade-in">
                  <div className="cv-header-text">TOGGLE COLUMNS</div>
                  {Object.keys(visibleColumns).map(col => (
                    <div className="cv-item-row" key={col}>
                      <span className="capitalize">{col.replace(/([A-Z])/g, ' $1')}</span>
                      <label className="cv-switch-modern">
                        <input type="checkbox" checked={visibleColumns[col]} onChange={() => toggleColumn(col)} />
                        <span className="cv-slider-round"></span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="quotation-table-card">
        <div className="list-table-wrapper">
          <table className="modern-quotation-table">
            <thead>
              <tr>
                <th style={{ width: '40px', textAlign: 'center' }}>
                  <input type="checkbox" className="modern-checkbox-premium" />
                </th>
                {visibleColumns.date && <th>Date <span className="sort-indicator">⇅</span></th>}
                {visibleColumns.reference && <th>Reference <span className="sort-indicator">⇅</span></th>}
                {visibleColumns.warehouse && <th>Warehouse</th>}
                {visibleColumns.biller && <th>Biller</th>}
                {visibleColumns.customer && <th>Customer <span className="sort-indicator">⇅</span></th>}
                {visibleColumns.supplier && <th>Supplier <span className="sort-indicator">⇅</span></th>}
                {visibleColumns.status && <th>Quotation Status</th>}
                {visibleColumns.grandTotal && <th className="text-right">Grand Total</th>}
                {visibleColumns.action && <th style={{ textAlign: 'center' }}>Action</th>}
              </tr>
            </thead>
            <tbody>
              {quotations.length === 0 ? (
                <tr>
                  <td colSpan={Object.values(visibleColumns).filter(v => v).length + 1} className="empty-state-cell">
                     No data available in table
                  </td>
                </tr>
              ) : (
                quotations.map((q) => (
                  <tr key={q.id}>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" className="modern-checkbox-premium" /></td>
                    {visibleColumns.date && <td>{q.date}</td>}
                    {visibleColumns.reference && <td>{q.reference}</td>}
                    {visibleColumns.warehouse && <td>{q.warehouse}</td>}
                    {visibleColumns.biller && <td>{q.biller}</td>}
                    {visibleColumns.customer && <td>{q.customer}</td>}
                    {visibleColumns.supplier && <td>{q.supplier}</td>}
                    {visibleColumns.status && (
                      <td>
                        <span className={`status-badge-premium ${q.status.toLowerCase()}`}>
                          {q.status}
                        </span>
                      </td>
                    )}
                    {visibleColumns.grandTotal && <td className="text-right font-semibold">${q.grandTotal.toFixed(2)}</td>}
                    {visibleColumns.action && (
                      <td className="action-cell">
                        <div className="action-dropdown-container">
                          <button 
                            className="action-dropdown-btn-premium"
                            onClick={() => toggleDropdown(q.id)}
                          >
                            Action <ChevronDown size={14} />
                          </button>
                          {openDropdown === q.id && (
                            <div className="action-menu-premium fade-in">
                              <button className="action-item"><Eye size={14}/> View</button>
                              <button className="action-item"><Edit size={14}/> Edit</button>
                              <button className="action-item"><Trash2 size={14}/> Delete</button>
                            </div>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
              {/* Footer Total Row */}
              <tr className="table-total-row">
                <td colSpan={Object.values(visibleColumns).filter(v => v).length - 2}>Total</td>
                <td className="text-right font-bold text-purple">${quotations.reduce((acc, q) => acc + q.grandTotal, 0).toFixed(2)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer info/Pagination */}
        <div className="quotation-table-footer">
          <div className="footer-info">
            Showing 1 to {quotations.length} of {quotations.length} entries
          </div>
          <div className="modern-pagination">
            <button className="page-nav-btn disabled"><ChevronLeft size={16} /></button>
            <button className="page-num-btn active">1</button>
            <button className="page-nav-btn disabled"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuotationList;
