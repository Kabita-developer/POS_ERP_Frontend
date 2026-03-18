import React, { useState, useRef } from 'react';
import './AddPurchase.css';
import { 
    Calendar, 
    Trash2, 
    Barcode, 
    HelpCircle, 
    ChevronDown,
    Plus,
    X,
    FileText
} from 'lucide-react';

const AddPurchase = () => {
    // Basic Form States
    const [formData, setFormData] = useState({
        date: '2026-03-18',
        warehouse: '',
        supplier: '',
        status: 'Received',
        tax: 'No Tax',
        discount: '0.00',
        shipping: '0.00',
        note: ''
    });

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [fileName, setFileName] = useState('No file chosen');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('No file chosen');
        }
    };

    const triggerFilePicker = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="add-purchase-container">
            <div className="add-purchase-card">
                <h1 className="add-purchase-title">Add Purchase</h1>
                <p className="required-hint">The field labels marked with <span>*</span> are required input fields.</p>

                {/* Primary Inputs */}
                <div className="form-row">
                    <div className="form-group">
                        <label>Date</label>
                        <div className="search-input-group" style={{ height: 'auto', border: 'none' }}>
                             <input 
                                type="text" 
                                name="date"
                                className="search-field" 
                                style={{ border: '1px solid #e2e8f0', borderRadius: '6px' }}
                                value={formData.date}
                                onChange={handleInputChange}
                                placeholder="Choose date"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Warehouse <span className="required">*</span></label>
                        <select 
                            name="warehouse"
                            value={formData.warehouse}
                            onChange={handleInputChange}
                        >
                            <option value="">Select warehouse...</option>
                            <option value="main">Main Warehouse</option>
                            <option value="sub">Sub Warehouse</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Supplier</label>
                        <select 
                            name="supplier"
                            value={formData.supplier}
                            onChange={handleInputChange}
                        >
                            <option value="">Select supplier...</option>
                            <option value="abc">ABC Supplies</option>
                            <option value="xyz">XYZ Electronics</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Purchase Status</label>
                        <select 
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                        >
                            <option value="Received">Received</option>
                            <option value="Pending">Pending</option>
                            <option value="Partial">Partial</option>
                            <option value="Ordered">Ordered</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>
                            Attach Document 
                            <span className="help-circle-icon" title="Upload relevant documents">?</span>
                        </label>
                        <div className="file-input-wrapper">
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                style={{ display: 'none' }} 
                                onChange={handleFileChange}
                            />
                            <button className="btn-file-choose" onClick={triggerFilePicker}>
                                Choose File
                            </button>
                            <span className="file-name">{fileName}</span>
                        </div>
                    </div>
                </div>

                {/* Product Search Bar */}
                <div className="product-search-section">
                    <label className="product-search-label">Select Product</label>
                    <div className="search-input-group">
                        <div className="search-icon-box">
                            <Barcode size={24} />
                        </div>
                        <input 
                            type="text" 
                            className="search-field"
                            placeholder="Please type product code and select..."
                        />
                    </div>
                </div>

                {/* Main Order Table */}
                <div className="order-table-title">Order Table <span className="required">*</span></div>
                <div className="order-table-container">
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Quantity</th>
                                <th>Batch No</th>
                                <th>Expired Date</th>
                                <th>Net Unit Cost</th>
                                <th>Discount</th>
                                <th>Tax</th>
                                <th>SubTotal</th>
                                <th style={{ width: '40px' }}><Trash2 size={16} /></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="10" className="no-data-msg py-8">
                                    No products selected
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan="2">Total</th>
                                <td>0</td>
                                <td colSpan="3"></td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td><Trash2 size={16} className="row-delete-btn" /></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Secondary Filters */}
                <div className="form-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    <div className="form-group">
                        <label>Order Tax</label>
                        <select 
                            name="tax"
                            value={formData.tax}
                            onChange={handleInputChange}
                        >
                            <option value="No Tax">No Tax</option>
                            <option value="GST 5%">GST 5%</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Discount</label>
                        <input 
                            type="text" 
                            name="discount"
                            value={formData.discount}
                            onChange={handleInputChange}
                            placeholder="0.00"
                        />
                    </div>
                    <div className="form-group">
                        <label>Shipping Cost</label>
                        <input 
                            type="text" 
                            name="shipping"
                            value={formData.shipping}
                            onChange={handleInputChange}
                            placeholder="0.00"
                        />
                    </div>
                </div>

                {/* Note Area */}
                <div className="note-box">
                    <div className="form-group">
                        <label>Note</label>
                        <textarea 
                            name="note"
                            value={formData.note}
                            onChange={handleInputChange}
                            placeholder="Write your notes here..."
                        ></textarea>
                    </div>
                </div>

                <button className="btn-submit-form">Submit</button>

                {/* Sticky-like Summary Footer */}
                <div className="purchase-summary-strip">
                    <div className="summary-block">
                        <span className="summary-label-text">Items</span>
                        <span className="summary-value-text">0.00</span>
                    </div>
                    <div className="summary-block">
                        <span className="summary-label-text">Total</span>
                        <span className="summary-value-text">0.00</span>
                    </div>
                    <div className="summary-block">
                        <span className="summary-label-text">Order Tax</span>
                        <span className="summary-value-text">0.00</span>
                    </div>
                    <div className="summary-block">
                        <span className="summary-label-text">Order Discount</span>
                        <span className="summary-value-text">0.00</span>
                    </div>
                    <div className="summary-block">
                        <span className="summary-label-text">Shipping Cost</span>
                        <span className="summary-value-text">0.00</span>
                    </div>
                    <div className="summary-block grand-total-block">
                        <span className="summary-label-text">Grand Total</span>
                        <span className="summary-value-text">0.00</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPurchase;
