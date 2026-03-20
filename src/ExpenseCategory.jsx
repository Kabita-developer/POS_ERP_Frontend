import React, { useState } from 'react';
import './ExpenseCategory.css';
import {
  Plus, Upload, Search, FileText, Copy, FileSpreadsheet,
  Printer, Columns, ChevronLeft, ChevronRight, Edit, Trash2, ShieldAlert,
  ChevronDown, Eye
} from 'lucide-react';
import AddExpenseCategoryModal from './AddExpenseCategoryModal';
import ImportExpenseCategoryModal from './ImportExpenseCategoryModal';
import EditExpenseCategoryModal from './EditExpenseCategoryModal';
import ViewExpenseCategoryModal from './ViewExpenseCategoryModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

function ExpenseCategory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showColumnToggle, setShowColumnToggle] = useState(false);
  const [columnsVisible, setColumnsVisible] = useState({
    code: true,
    name: true,
    action: true
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const toggleColumn = (colName) => {
    setColumnsVisible(prev => ({
      ...prev,
      [colName]: !prev[colName]
    }));
  };

  const handleAddCategory = (newCat) => {
    setCategories([{ code: newCat.code, name: newCat.name }, ...categories]);
    setIsAddModalOpen(false);
  };

  const handleImportCategory = (file) => {
    // In a real app we would parse the CSV and do something here. 
    // To simulate, we just close the modal.
    console.log("Importing file:", file.name);
    setIsImportModalOpen(false);
  };

  const handleEditCategory = (updatedCat) => {
    setCategories(categories.map(cat => cat.code === updatedCat.code ? updatedCat : cat));
    setIsEditModalOpen(false);
  };

  const handleDeleteCategory = () => {
    if (selectedCategory) {
      setCategories(categories.filter(cat => cat.code !== selectedCategory.code));
    }
  };

  const openActionModal = (cat, type) => {
    setSelectedCategory(cat);
    setOpenDropdown(null);
    if (type === 'view') setIsViewModalOpen(true);
    if (type === 'edit') setIsEditModalOpen(true);
    if (type === 'delete') setIsDeleteModalOpen(true);
  };

  const [categories, setCategories] = useState([
    { code: 'CAT-001', name: 'Office Supplies' },
    { code: 'CAT-002', name: 'Software Licenses' },
    { code: 'CAT-003', name: 'Internet & Networking' },
    { code: 'CAT-004', name: 'Travel & Accommodation' },
    { code: 'CAT-005', name: 'Hardware Repairs' }
  ]);

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedCategories = filteredCategories.slice(0, recordsPerPage);

  return (
    <div className="expense-category-container fade-in">
      <div className="expense-category-header">
        <h2 className="page-title">Expense Category</h2>
        <div className="header-actions">
          <button className="btn-modern btn-teal" onClick={() => setIsAddModalOpen(true)}>
            <Plus size={16} /> Add Expense Category
          </button>
          <button className="btn-modern btn-purple" onClick={() => setIsImportModalOpen(true)}>
            <Upload size={16} /> Import Expense Category
          </button>
        </div>
      </div>

      <div className="expense-category-card">
        {/* Toolbar */}
        <div className="table-toolbar">
          <div className="toolbar-left">
            <div className="records-selector">
              <select 
                value={recordsPerPage} 
                onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                className="modern-select"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-muted">records per page</span>
            </div>
            
            <div className="search-box">
              <span className="text-muted">Search</span>
              <div className="input-with-icon">
                <Search size={14} className="input-icon" />
                <input 
                  type="text" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="modern-input"
                  placeholder="Search categories..."
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
                 <button className="export-btn btn-export-purple" title="Column Visibility" onClick={() => setShowColumnToggle(!showColumnToggle)}>
                   <Columns size={18} />
                 </button>
                 {showColumnToggle && (
                   <div className="column-visibility-dropdown fade-in" style={{ animationDuration: '0.2s' }}>
                     <div className="cv-header">TOGGLE COLUMNS</div>
                     <div className="cv-item">
                       <span>Code</span>
                       <label className="cv-switch">
                         <input type="checkbox" checked={columnsVisible.code} onChange={() => toggleColumn('code')} />
                         <span className="cv-slider"></span>
                       </label>
                     </div>
                     <div className="cv-item">
                       <span>Name</span>
                       <label className="cv-switch">
                         <input type="checkbox" checked={columnsVisible.name} onChange={() => toggleColumn('name')} />
                         <span className="cv-slider"></span>
                       </label>
                     </div>
                     <div className="cv-item">
                       <span>Action</span>
                       <label className="cv-switch">
                         <input type="checkbox" checked={columnsVisible.action} onChange={() => toggleColumn('action')} />
                         <span className="cv-slider"></span>
                       </label>
                     </div>
                   </div>
                 )}
               </div>
             </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="table-wrapper">
          <table className="modern-data-table">
            <thead>
              <tr>
                <th style={{ width: '40px', textAlign: 'center' }}>
                  <input type="checkbox" className="modern-checkbox" />
                </th>
                {columnsVisible.code && <th>Code <span className="sort-icon">⇅</span></th>}
                {columnsVisible.name && <th>Name <span className="sort-icon">⇅</span></th>}
                {columnsVisible.action && <th style={{ textAlign: 'center' }}>Action</th>}
              </tr>
            </thead>
            <tbody>
              {displayedCategories.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-state-cell">
                     <div className="empty-state-content">
                        <ShieldAlert size={40} className="empty-icon" />
                        <p>No data available in table</p>
                     </div>
                  </td>
                </tr>
              ) : (
                displayedCategories.map((cat, idx) => (
                  <tr key={idx}>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" className="modern-checkbox" /></td>
                    {columnsVisible.code && <td>{cat.code}</td>}
                    {columnsVisible.name && <td>{cat.name}</td>}
                    {columnsVisible.action && (
                    <td className="action-cell">
                      <div className="action-dropdown-container">
                        <button 
                          className="action-dropdown-btn" 
                          onClick={() => toggleDropdown(cat.code)}
                        >
                          Action <ChevronDown size={14} />
                        </button>
                        {openDropdown === cat.code && (
                          <div className="action-dropdown-menu fade-in" style={{ animationDuration: '0.2s' }}>
                            <button className="action-dropdown-item" onClick={() => openActionModal(cat, 'view')}>
                              <Eye size={16} /> View
                            </button>
                            <button className="action-dropdown-item" onClick={() => openActionModal(cat, 'edit')}>
                              <Edit size={16} /> Edit
                            </button>

                            <button className="action-dropdown-item" onClick={() => openActionModal(cat, 'delete')}>
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

        {/* Footer */}
        <div className="table-footer">
          <div className="table-info">
            Showing {displayedCategories.length > 0 ? 1 : 0} to {displayedCategories.length} of {filteredCategories.length} entries
          </div>
          <div className="pagination">
            <button className="page-nav-btn" disabled><ChevronLeft size={16} /></button>
            <button className="page-nav-btn" disabled><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <AddExpenseCategoryModal 
          onClose={() => setIsAddModalOpen(false)} 
          onSubmit={handleAddCategory} 
        />
      )}

      {isImportModalOpen && (
        <ImportExpenseCategoryModal
          onClose={() => setIsImportModalOpen(false)}
          onSubmit={handleImportCategory}
        />
      )}

      {isEditModalOpen && (
        <EditExpenseCategoryModal
          category={selectedCategory}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEditCategory}
        />
      )}

      {isViewModalOpen && (
        <ViewExpenseCategoryModal
          category={selectedCategory}
          onClose={() => setIsViewModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteCategory}
          itemName={selectedCategory?.name}
        />
      )}
    </div>
  );
}

export default ExpenseCategory;
