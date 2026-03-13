import React, { useState } from 'react';
import './CategoryList.css';
import AddCategoryModal from './AddCategoryModal';
import ImportCategoryModal from './ImportCategoryModal';
import UpdateCategoryModal from './UpdateCategoryModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
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
    MoreVertical,
    Edit,
    Trash2,
    Image as ImageIcon
} from 'lucide-react';

const CategoryList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isColumnVisibilityOpen, setIsColumnVisibilityOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [visibleColumns, setVisibleColumns] = useState({
        image: true,
        category: true,
        parent: true,
        products: true,
        stock: true,
        worth: true,
        action: true
    });

    const toggleColumn = (column) => {
        setVisibleColumns(prev => ({
            ...prev,
            [column]: !prev[column]
        }));
    };

    const toggleDropdown = (id) => {
        if (activeDropdown === id) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(id);
        }
    };

    // Mock data based on images
    const categories = [
        { id: 1, image: null, name: 'accessories', parent: 'N/A', products: 0, stock: 0, worthPrice: 0, worthCost: 0 },
        { id: 2, image: null, name: 'apparel', parent: 'N/A', products: 0, stock: 0, worthPrice: 0, worthCost: 0 },
        { id: 3, image: null, name: 'biscuit', parent: 'biscuit', products: 0, stock: 0, worthPrice: 0, worthCost: 0 },
        { id: 4, image: null, name: 'Chocolate', parent: 'N/A', products: 0, stock: 0, worthPrice: 0, worthCost: 0 },
        { id: 5, image: null, name: 'fhj', parent: 'N/A', products: 0, stock: 0, worthPrice: 0, worthCost: 0 },
        { id: 6, image: null, name: 'fish', parent: 'N/A', products: 1, stock: 0, worthPrice: 0, worthCost: 0 },
        { id: 7, image: null, name: 'flower', parent: 'biscuit', products: 0, stock: 0, worthPrice: 0, worthCost: 0 },
        { id: 8, image: null, name: 'rty', parent: 'N/A', products: 0, stock: 0, worthPrice: 0, worthCost: 0 },
        { id: 9, image: null, name: 'urn', parent: 'N/A', products: 0, stock: 0, worthPrice: 0, worthCost: 0 },
    ];

    const filteredCategories = categories.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.parent.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="category-container fade-in">
            {/* Action Buttons Header */}
            <div className="category-header-actions">
                <div className="left-actions">
                    <button className="btn-add" onClick={() => setIsAddModalOpen(true)}>
                        <Plus size={18} />
                        <span>Add Category</span>
                    </button>
                    <button className="btn-import" onClick={() => setIsImportModalOpen(true)}>
                        <Upload size={18} />
                        <span>Import Category</span>
                    </button>
                </div>
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
                            <option value={100}>100</option>
                        </select>
                        <span>records per page</span>
                    </div>

                    <div className="search-box-wrapper">
                        <span>Search</span>
                        <div className="search-input-inner">
                            <Search size={16} className="search-icon-inside" />
                            <input 
                                type="text" 
                                placeholder="Search here..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="export-buttons">
                        <button className="export-btn pdf" data-tooltip="PDF Export"><FileText size={16} /></button>
                        <button className="export-btn copy" data-tooltip="Copy to Clipboard"><Copy size={16} /></button>
                        <button className="export-btn excel" data-tooltip="Excel Export"><FileSpreadsheet size={16} /></button>
                        <button className="export-btn print" data-tooltip="Print Table"><Printer size={16} /></button>
                        <button className="export-btn delete" data-tooltip="Delete Selected"><X size={16} /></button>
                        <div className="visibility-wrapper">
                            <button 
                                className={`export-btn view ${isColumnVisibilityOpen ? 'active' : ''}`} 
                                data-tooltip="Column Visibility"
                                onClick={() => setIsColumnVisibilityOpen(!isColumnVisibilityOpen)}
                            >
                                <Eye size={16} />
                            </button>
                            {isColumnVisibilityOpen && (
                                <div className="visibility-dropdown fade-in-up">
                                    <div className="dropdown-title">Toggle Columns</div>
                                    {[
                                        { id: 'image', label: 'Image' },
                                        { id: 'category', label: 'Category' },
                                        { id: 'parent', label: 'Parent Category' },
                                        { id: 'products', label: 'Number of Product' },
                                        { id: 'stock', label: 'Stock Quantity' },
                                        { id: 'worth', label: 'Stock Worth (Price/Cost)' },
                                        { id: 'action', label: 'Action' }
                                    ].map(col => (
                                        <label key={col.id} className="visibility-item">
                                            <span>{col.label}</span>
                                            <input 
                                                type="checkbox" 
                                                checked={visibleColumns[col.id]}
                                                onChange={() => toggleColumn(col.id)}
                                            />
                                            <span className="custom-toggle"></span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Table */}
            <div className="table-container">
                <table className="category-table">
                    <thead>
                        <tr>
                            <th className="checkbox-col">
                                <input type="checkbox" className="custom-checkbox" />
                            </th>
                            {visibleColumns.image && <th>Image</th>}
                            {visibleColumns.category && <th>Category <span className="sort-icon">⇅</span></th>}
                            {visibleColumns.parent && <th>Parent Category</th>}
                            {visibleColumns.products && <th>Number of Product</th>}
                            {visibleColumns.stock && <th>Stock Quantity</th>}
                            {visibleColumns.worth && <th>Stock Worth (Price/Cost)</th>}
                            {visibleColumns.action && <th className="text-right">Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map((cat) => (
                                <tr key={cat.id}>
                                    <td>
                                        <input type="checkbox" className="custom-checkbox" />
                                    </td>
                                    {visibleColumns.image && (
                                        <td>
                                            <div className="category-img-placeholder">
                                                <ImageIcon size={20} />
                                            </div>
                                        </td>
                                    )}
                                    {visibleColumns.category && <td className="font-medium">{cat.name}</td>}
                                    {visibleColumns.parent && <td>{cat.parent}</td>}
                                    {visibleColumns.products && <td>{cat.products}</td>}
                                    {visibleColumns.stock && <td>{cat.stock}</td>}
                                    {visibleColumns.worth && (
                                        <td className="text-muted">
                                            INR {cat.worthPrice} / INR {cat.worthCost}
                                        </td>
                                    )}
                                    {visibleColumns.action && (
                                        <td className="text-right">
                                            <div className="action-wrapper">
                                                <div 
                                                    className={`action-dropdown-trigger ${activeDropdown === cat.id ? 'active' : ''}`}
                                                    onClick={() => toggleDropdown(cat.id)}
                                                >
                                                    <span>Action</span>
                                                    <ChevronDown size={14} />
                                                </div>
                                                {activeDropdown === cat.id && (
                                                    <div className="action-dropdown-menu">
                                                        <button 
                                                            className="dropdown-item"
                                                            onClick={() => {
                                                                setSelectedCategory(cat);
                                                                setIsUpdateModalOpen(true);
                                                                setActiveDropdown(null);
                                                            }}
                                                        >
                                                            <Edit size={14} /> Edit
                                                        </button>
                                                        <button 
                                                            className="dropdown-item delete"
                                                            onClick={() => {
                                                                setSelectedCategory(cat);
                                                                setIsDeleteModalOpen(true);
                                                                setActiveDropdown(null);
                                                            }}
                                                        >
                                                            <Trash2 size={14} /> Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center empty-state" style={{ padding: '40px' }}>
                                    No categories found matching "{searchTerm}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer Pagination */}
            <div className="category-footer">
                <div className="showing-info">
                    Showing 1 - {filteredCategories.length} ({filteredCategories.length})
                </div>
                <div className="pagination">
                    <button className="page-btn disabled">
                        <ChevronLeft size={16} />
                    </button>
                    <button className="page-btn active">1</button>
                    <button className="page-btn disabled">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <AddCategoryModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
            />

            <ImportCategoryModal 
                isOpen={isImportModalOpen} 
                onClose={() => setIsImportModalOpen(false)} 
            />

            <UpdateCategoryModal 
                isOpen={isUpdateModalOpen} 
                onClose={() => setIsUpdateModalOpen(false)} 
                categoryData={selectedCategory}
            />

            <DeleteConfirmationModal 
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => console.log('Deleted:', selectedCategory?.name)}
                itemName={selectedCategory?.name}
            />
        </div>
    );
};

const ChevronDown = ({ size }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
);

export default CategoryList;
