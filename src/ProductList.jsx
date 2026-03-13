import React, { useState } from 'react';
import './ProductList.css';
import AddProductModal from './AddProductModal';
import ImportProductModal from './ImportProductModal';
import ViewProductModal from './ViewProductModal';
import UpdateProductModal from './UpdateProductModal';
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
    Edit,
    Trash2,
    Image as ImageIcon,
    ChevronDown,
    MoreVertical
} from 'lucide-react';

const ProductList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isColumnVisibilityOpen, setIsColumnVisibilityOpen] = useState(false);

    const [visibleColumns, setVisibleColumns] = useState({
        image: true,
        name: true,
        code: true,
        brand: true,
        category: true,
        quantity: true,
        unit: true,
        price: true,
        cost: true,
        worth: true,
        action: true
    });

    const products = [
        { 
            id: 1, 
            image: null, 
            name: 'umbrella', 
            code: '4321', 
            brand: 'Lotto', 
            category: 'fish', 
            quantity: 0, 
            unit: 'N/A', 
            price: 56, 
            cost: 0, 
            worthPrice: 0, 
            worthCost: 0 
        }
    ];

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleColumn = (column) => {
        setVisibleColumns(prev => ({ ...prev, [column]: !prev[column] }));
    };

    const toggleDropdown = (id) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    return (
        <React.Fragment>
            <div className="product-container fade-in">
                {/* Action Buttons Header */}
                <div className="product-header-actions">
                    <div className="left-actions">
                        <button className="btn-add" onClick={() => setIsAddModalOpen(true)}>
                            <Plus size={18} />
                            <span>Add Product</span>
                        </button>
                        <button className="btn-import" onClick={() => setIsImportModalOpen(true)}>
                            <Upload size={18} />
                            <span>Import Product</span>
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
                            </select>
                            <span>records per page</span>
                        </div>

                        <div className="search-box-wrapper">
                            <span>Search</span>
                            <div className="search-input-inner">
                                <Search size={16} className="search-icon-inside" />
                                <input 
                                    type="text" 
                                    placeholder="Search products..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="export-buttons">
                            <button className="export-btn pdf" data-tooltip="PDF Export"><FileText size={16} /></button>
                            <button className="export-btn copy" data-tooltip="Copy Record"><Copy size={16} /></button>
                            <button className="export-btn excel" data-tooltip="Excel Export"><FileSpreadsheet size={16} /></button>
                            <button className="export-btn print" data-tooltip="Print Table"><Printer size={16} /></button>
                            <button className="export-btn delete" data-tooltip="Delete Selected"><X size={16} /></button>
                            <div className="visibility-wrapper">
                                <button 
                                    className={`export-btn view ${isColumnVisibilityOpen ? 'active' : ''}`}
                                    onClick={() => setIsColumnVisibilityOpen(!isColumnVisibilityOpen)}
                                    data-tooltip="Column Visibility"
                                >
                                    <Eye size={16} />
                                </button>
                                {isColumnVisibilityOpen && (
                                    <div className="visibility-dropdown fade-in-up">
                                        <div className="dropdown-title">Toggle Columns</div>
                                        {[
                                            { id: 'image', label: 'Image' },
                                            { id: 'name', label: 'Name' },
                                            { id: 'code', label: 'Code' },
                                            { id: 'brand', label: 'Brand' },
                                            { id: 'category', label: 'Category' },
                                            { id: 'quantity', label: 'Quantity' },
                                            { id: 'unit', label: 'Unit' },
                                            { id: 'price', label: 'Price' },
                                            { id: 'cost', label: 'Cost' },
                                            { id: 'worth', label: 'Stock Worth' },
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
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th className="checkbox-col"><input type="checkbox" className="custom-checkbox" /></th>
                                {visibleColumns.image && <th>Image</th>}
                                {visibleColumns.name && <th>Name <span className="sort-icon">⇅</span></th>}
                                {visibleColumns.code && <th>Code <span className="sort-icon">⇅</span></th>}
                                {visibleColumns.brand && <th>Brand <span className="sort-icon">⇅</span></th>}
                                {visibleColumns.category && <th>Category <span className="sort-icon">⇅</span></th>}
                                {visibleColumns.quantity && <th>Quantity</th>}
                                {visibleColumns.unit && <th>Unit</th>}
                                {visibleColumns.price && <th>Price</th>}
                                {visibleColumns.cost && <th>Cost</th>}
                                {visibleColumns.worth && <th>Stock Worth (Price/Cost)</th>}
                                {visibleColumns.action && <th className="text-right">Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td><input type="checkbox" className="custom-checkbox" /></td>
                                        {visibleColumns.image && (
                                            <td>
                                                <div className="product-img-placeholder">
                                                    <ImageIcon size={20} />
                                                </div>
                                            </td>
                                        )}
                                        {visibleColumns.name && <td className="font-medium">{product.name}</td>}
                                        {visibleColumns.code && <td>{product.code}</td>}
                                        {visibleColumns.brand && <td>{product.brand}</td>}
                                        {visibleColumns.category && <td>{product.category}</td>}
                                        {visibleColumns.quantity && <td>{product.quantity}</td>}
                                        {visibleColumns.unit && <td>{product.unit}</td>}
                                        {visibleColumns.price && <td>INR {product.price}</td>}
                                        {visibleColumns.cost && <td>INR {product.cost}</td>}
                                        {visibleColumns.worth && (
                                            <td className="text-muted">
                                                INR {product.worthPrice} / INR {product.worthCost}
                                            </td>
                                        )}
                                        {visibleColumns.action && (
                                            <td className="text-right">
                                                <div className="action-wrapper">
                                                    <div 
                                                        className={`action-dropdown-trigger ${activeDropdown === product.id ? 'active' : ''}`}
                                                        onClick={() => toggleDropdown(product.id)}
                                                    >
                                                        <span>Action</span>
                                                        <ChevronDown size={14} />
                                                    </div>
                                                    {activeDropdown === product.id && (
                                                        <div className="action-dropdown-menu fade-in-up">
                                                            <button 
                                                                className="dropdown-item"
                                                                onClick={() => {
                                                                    setSelectedProduct(product);
                                                                    setIsViewModalOpen(true);
                                                                    setActiveDropdown(null);
                                                                }}
                                                            >
                                                                <Eye size={14} /> View
                                                            </button>
                                                            <button className="dropdown-item" onClick={() => {
                                                                setSelectedProduct(product);
                                                                setIsEditModalOpen(true);
                                                                setActiveDropdown(null);
                                                            }}><Edit size={14} /> Edit</button>
                                                            <button className="dropdown-item"><Printer size={14} /> Print Barcode</button>
                                                            <button className="dropdown-item delete"><Trash2 size={14} /> Delete</button>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="12" className="text-center empty-state">No products found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="product-footer">
                    <div className="showing-info">
                        Showing 1 - {filteredProducts.length} ({filteredProducts.length})
                    </div>
                    <div className="pagination">
                        <button className="page-btn disabled"><ChevronLeft size={16} /></button>
                        <button className="page-btn active">1</button>
                        <button className="page-btn disabled"><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>

            <AddProductModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
            />

            <ImportProductModal 
                isOpen={isImportModalOpen} 
                onClose={() => setIsImportModalOpen(false)} 
            />

            <ViewProductModal 
                isOpen={isViewModalOpen} 
                onClose={() => setIsViewModalOpen(false)} 
                productData={selectedProduct}
            />

            <UpdateProductModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
                productData={selectedProduct}
            />
        </React.Fragment>
    );
};

export default ProductList;
