import React, { useState } from 'react';
import './ExpenseList.css';
import {
  Plus, Search, FileText, FileSpreadsheet,
  Printer, Columns, ChevronLeft, ChevronRight, Edit, Trash2, ShieldAlert,
  ChevronDown, Eye
} from 'lucide-react';
import ViewExpenseModal from './ViewExpenseModal';
import EditExpenseModal from './EditExpenseModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import AddExpenseModal from './AddExpenseModal';

function ExpenseList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  // For standard actions, reusing the UI style from the previous task
  const [expenses, setExpenses] = useState([
    { id: 1, date: '2025-10-12', referenceNo: 'EXP-1001', warehouse: 'Main Warehouse', category: 'Office Supplies', amount: 250.00, note: 'Printer paper and ink' },
    { id: 2, date: '2025-10-14', referenceNo: 'EXP-1002', warehouse: 'Store A', category: 'Hardware Repairs', amount: 1500.00, note: 'Fixed broken register' },
    { id: 3, date: '2025-10-18', referenceNo: 'EXP-1003', warehouse: 'Main Warehouse', category: 'Software Licenses', amount: 80.00, note: 'Monthly cloud subscription' },
    { id: 4, date: '2025-10-22', referenceNo: 'EXP-1004', warehouse: 'Store B', category: 'Internet & Networking', amount: 120.50, note: 'Wifi replacement' },
    { id: 5, date: '2025-10-25', referenceNo: 'EXP-1005', warehouse: 'Main Warehouse', category: 'Travel & Accommodation', amount: 450.00, note: 'Manager visit' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showColumnToggle, setShowColumnToggle] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    date: true,
    referenceNo: true,
    warehouse: true,
    category: true,
    amount: true,
    note: true,
    action: true
  });

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const toggleColumn = (col) => {
    setVisibleColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  const openActionModal = (expense, type) => {
    setSelectedExpense(expense);
    setOpenDropdown(null);
    if (type === 'view') setIsViewModalOpen(true);
    if (type === 'edit') setIsEditModalOpen(true);
    if (type === 'delete') setIsDeleteModalOpen(true);
  };

  const handleAddExpense = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
    setIsAddModalOpen(false);
  };

  const handleEditExpense = (updatedExpense) => {
    setExpenses(expenses.map(exp => exp.id === updatedExpense.id ? updatedExpense : exp));
    setIsEditModalOpen(false);
  };

  const handleDeleteExpense = () => {
    if (selectedExpense) {
      setExpenses(expenses.filter(exp => exp.id !== selectedExpense.id));
      setIsDeleteModalOpen(false);
    }
  };

  const filteredExpenses = expenses.filter(
    (exp) =>
      exp.referenceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.warehouse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredExpenses.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const displayedExpenses = filteredExpenses.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalAmount = displayedExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="expense-category-container fade-in">
      {/* Top Filter Card */}
      <div className="expense-list-filter-card">
        <h2 className="expense-list-title">Expense List</h2>
        <div className="filter-form-row">
          <div className="filter-group">
            <span className="filter-label">Choose Your Date</span>
            <input type="text" className="modern-input daterange-input" placeholder="2025-03-01 To 2026-03-20" />
          </div>
          <div className="filter-group">
            <span className="filter-label">Choose Warehouse</span>
            <select className="modern-select select-input">
              <option>All Warehouse</option>
              <option>Main Warehouse</option>
              <option>Store A</option>
            </select>
          </div>
          <div className="filter-group submit-group">
            <button className="btn-modern btn-purple filter-submit-btn">Submit</button>
          </div>
        </div>
      </div>

      <div className="expense-category-header no-border">
        <div className="header-actions">
          <button className="btn-modern btn-teal" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} /> Add Expense
          </button>
        </div>
      </div>

      <div className="expense-category-card table-card">
        {/* Table Toolbar */}
        <div className="table-toolbar">
          <div className="toolbar-left">
            <div className="record-selector">
              <select
                value={recordsPerPage}
                onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                className="modern-select"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="records-per-page-text">records per page</span>
            </div>

            <div className="search-box">
              <span className="search-label">Search</span>
              <div className="input-with-icon">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="modern-input"
                  placeholder="Search expense..."
                />
              </div>
            </div>
          </div>

          <div className="toolbar-right">
            <div className="export-action-buttons premium-action-buttons">
              <button className="export-btn btn-export-red" title="Export to PDF"><FileText size={18} /></button>
              <button className="export-btn btn-export-gray" title="Export to Excel"><FileSpreadsheet size={18} /></button>
              <button className="export-btn btn-export-yellow" title="Export to CSV"><FileText size={18} /></button>
              <button className="export-btn btn-export-blue" title="Print"><Printer size={18} /></button>
              <button className="export-btn btn-export-orange" title="Delete"><Trash2 size={18} /></button>
              
              <div className="column-visibility-container">
                <button 
                  className="export-btn btn-export-purple" 
                  title="Column Visibility"
                  onClick={() => setShowColumnToggle(!showColumnToggle)}
                >
                  <Columns size={18} />
                </button>

                {showColumnToggle && (
                  <div className="column-visibility-dropdown fade-in">
                    <div className="cv-header">TOGGLE COLUMNS</div>
                    {Object.keys(visibleColumns).map((col) => (
                      <div className="cv-item" key={col}>
                        <span className="capitalize">{col.replace(/([A-Z])/g, ' $1')}</span>
                        <label className="cv-switch">
                          <input 
                            type="checkbox" 
                            checked={visibleColumns[col]} 
                            onChange={() => toggleColumn(col)} 
                          />
                          <span className="cv-slider"></span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-wrapper list-table-wrapper">
          <table className="modern-data-table expense-list-table">
            <thead>
              <tr>
                <th style={{ width: '40px', textAlign: 'center' }}>
                  <input type="checkbox" className="modern-checkbox" />
                </th>
                {visibleColumns.date && <th>Date <span className="sort-icon">⇅</span></th>}
                {visibleColumns.referenceNo && <th>Reference No <span className="sort-icon">⇅</span></th>}
                {visibleColumns.warehouse && <th>Warehouse</th>}
                {visibleColumns.category && <th>Category</th>}
                {visibleColumns.amount && <th>Amount <span className="sort-icon">⇅</span></th>}
                {visibleColumns.note && <th>Note</th>}
                {visibleColumns.action && <th style={{ textAlign: 'center' }}>Action</th>}
              </tr>
            </thead>
            <tbody>
              {displayedExpenses.length === 0 ? (
                <tr>
                  <td colSpan={Object.values(visibleColumns).filter(v => v).length + 1} className="empty-state-cell p-4 text-center text-gray-500">
                    No data available in table
                  </td>
                </tr>
              ) : (
                displayedExpenses.map((exp) => (
                  <tr key={exp.id}>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" className="modern-checkbox" /></td>
                    {visibleColumns.date && <td>{exp.date}</td>}
                    {visibleColumns.referenceNo && <td>{exp.referenceNo}</td>}
                    {visibleColumns.warehouse && <td>{exp.warehouse}</td>}
                    {visibleColumns.category && <td>{exp.category}</td>}
                    {visibleColumns.amount && <td>${exp.amount.toFixed(2)}</td>}
                    {visibleColumns.note && <td>{exp.note}</td>}
                    {visibleColumns.action && (
                    <td className="action-cell">
                      <div className="action-dropdown-container">
                        <button
                          className="action-dropdown-btn"
                          onClick={() => toggleDropdown(exp.id)}
                        >
                          Action <ChevronDown size={14} />
                        </button>
                        {openDropdown === exp.id && (
                          <div className="action-dropdown-menu fade-in" style={{ animationDuration: '0.2s', zIndex: 100 }}>
                            <button className="action-dropdown-item" onClick={() => openActionModal(exp, 'view')}>
                              <Eye size={16} /> View
                            </button>
                            <button className="action-dropdown-item" onClick={() => openActionModal(exp, 'edit')}>
                              <Edit size={16} /> Edit
                            </button>
                            <button className="action-dropdown-item" onClick={() => openActionModal(exp, 'delete')}>
                              <Trash2 size={16} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with Total and Pagination */}
        <div className="table-footer">
          <div className="table-total-info">
            <span className="total-label">Total Amount:</span>
            <span className="total-value">${totalAmount.toFixed(2)}</span>
          </div>
          <div className="table-info">
            Showing {filteredExpenses.length > 0 ? indexOfFirstRecord + 1 : 0} to {Math.min(indexOfLastRecord, filteredExpenses.length)} of {filteredExpenses.length} entries
          </div>
          <div className="pagination">
            <button className="page-nav-btn" onClick={goToPrevPage} disabled={currentPage === 1}><ChevronLeft size={16} /></button>
            <button className="page-nav-btn" onClick={goToNextPage} disabled={currentPage === totalPages || totalPages === 0}><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <AddExpenseModal
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddExpense}
        />
      )}

      {/* Action Modals */}
      {isViewModalOpen && (
        <ViewExpenseModal
          expense={selectedExpense}
          onClose={() => setIsViewModalOpen(false)}
        />
      )}

      {isEditModalOpen && (
        <EditExpenseModal
          expense={selectedExpense}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditExpense}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteExpense}
          itemName={selectedExpense?.referenceNo}
        />
      )}
    </div>
  );
}

export default ExpenseList;
