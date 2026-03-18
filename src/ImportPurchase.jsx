import React, { useState, useRef } from 'react';
import './ImportPurchase.css';
import { 
    Download,
    HelpCircle
} from 'lucide-react';

const ImportPurchase = () => {
    // Form States
    const [formData, setFormData] = useState({
        warehouse: '',
        supplier: '',
        status: 'Received',
        tax: 'No Tax',
        discount: '',
        shipping: '',
        note: ''
    });

    const [attachFileName, setAttachFileName] = useState('No file chosen');
    const [csvFileName, setCsvFileName] = useState('No file chosen');
    
    const attachRef = useRef(null);
    const csvRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, type) => {
        if (e.target.files && e.target.files[0]) {
            const name = e.target.files[0].name;
            if (type === 'attach') setAttachFileName(name);
            if (type === 'csv') setCsvFileName(name);
        }
    };

    return (
        <div className="import-purchase-container">
            <div className="import-purchase-card">
                <h1 className="import-purchase-title">Import Purchase</h1>
                <p className="required-hint">The field labels marked with <span>*</span> are required input fields.</p>

                {/* Primary Row 1 */}
                <div className="form-row">
                    <div className="form-group">
                        <label>Warehouse <span className="required">*</span></label>
                        <select 
                            name="warehouse"
                            value={formData.warehouse}
                            onChange={handleInputChange}
                        >
                            <option value="">Select warehouse...</option>
                            <option value="main">Main Warehouse</option>
                            <option value="retail">Retail Outlet</option>
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
                            <option value="alpha">Alpha Trading</option>
                            <option value="beta">Beta Supplies</option>
                        </select>
                    </div>
                </div>

                {/* Primary Row 2 */}
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
                                style={{ display: 'none' }} 
                                ref={attachRef}
                                onChange={(e) => handleFileChange(e, 'attach')}
                            />
                            <button className="btn-file-choose" onClick={() => attachRef.current.click()}>
                                Choose File
                            </button>
                            <span className="file-name">{attachFileName}</span>
                        </div>
                    </div>
                </div>

                {/* Row 3: CSV Upload and Sample Download */}
                <div className="form-row" style={{ alignItems: 'flex-start' }}>
                    <div className="form-group">
                        <label>Upload CSV File <span className="required">*</span></label>
                        <div className="file-input-wrapper">
                            <input 
                                type="file" 
                                style={{ display: 'none' }} 
                                ref={csvRef}
                                accept=".csv"
                                onChange={(e) => handleFileChange(e, 'csv')}
                            />
                            <button className="btn-file-choose" onClick={() => csvRef.current.click()}>
                                Choose File
                            </button>
                            <span className="file-name">{csvFileName}</span>
                        </div>
                        <p className="csv-info">
                            The correct column order is (product_code, quantity, purchase_unit, product_cost, discount, tax_name) and you must follow this. All columns are required
                        </p>
                    </div>
                    <button className="btn-download-sample">
                        <Download size={20} />
                        Download Sample File
                    </button>
                </div>

                {/* Row 4: Secondary Calculations */}
                <div className="three-form-row">
                    <div className="form-group">
                        <label>Order Tax</label>
                        <select 
                            name="tax"
                            value={formData.tax}
                            onChange={handleInputChange}
                        >
                            <option value="No Tax">No Tax</option>
                            <option value="CGST 18%">CGST 18%</option>
                            <option value="VAT 5%">VAT 5%</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Discount</label>
                        <input 
                            name="discount"
                            type="text" 
                            placeholder="" 
                            value={formData.discount}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Shipping Cost</label>
                        <input 
                            name="shipping"
                            type="text" 
                            placeholder="" 
                            value={formData.shipping}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {/* Row 5: Note Area */}
                <div className="note-box">
                    <div className="form-group">
                        <label>Note</label>
                        <textarea 
                            name="note"
                            placeholder="Type any note here..."
                            value={formData.note}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                </div>

                <div className="form-actions">
                    <button className="btn-submit-import">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default ImportPurchase;
