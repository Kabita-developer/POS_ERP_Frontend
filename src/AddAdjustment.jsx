import React, { useState } from 'react';
import { 
    Barcode, Trash2, Info, Upload, 
    ChevronDown, PlusCircle, Search 
} from 'lucide-react';
import './AddAdjustment.css';

const AddAdjustment = () => {
    const [fileName, setFileName] = useState('No file chosen');
    const [warehouse, setWarehouse] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [note, setNote] = useState('');

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('No file chosen');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Adjustment Submitted:', { warehouse, fileName, note });
        alert('Adjustment submitted successfully');
    };

    return (
        <div className="add-adjustment-container">
            <div className="adjustment-card">
                {/* Header Subtitle */}
                <h1 className="page-title">Add Adjustment</h1>
                
                <p className="required-info">
                    The field labels marked with * are required input fields.
                </p>

                <form onSubmit={handleSubmit}>
                    {/* Warehouse and Document Selection */}
                    <div className="form-grid-two">
                        <div className="form-group">
                            <label>Warehouse *</label>
                            <select 
                                value={warehouse} 
                                onChange={(e) => setWarehouse(e.target.value)}
                                required
                            >
                                <option value="">Select warehouse...</option>
                                <option value="1">Warehouse 1</option>
                                <option value="2">Warehouse 2</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Attach Document</label>
                            <div className="file-input-wrapper">
                                <label className="file-btn" htmlFor="adj-file-upload">
                                    Choose File
                                </label>
                                <input 
                                    type="file" 
                                    id="adj-file-upload" 
                                    onChange={handleFileChange} 
                                />
                                <span className="file-name">{fileName}</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Search */}
                    <div className="product-search-container">
                        <label className="section-label">Select Product</label>
                        <div className="product-search-wrapper">
                            <div className="barcode-icon">
                                <Barcode size={24} />
                            </div>
                            <input 
                                type="text" 
                                className="product-search-input"
                                placeholder="Please type product code and select..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Order Table Section */}
                    <div className="order-table-section">
                        <label className="section-label">Order Table *</label>
                        <div className="table-responsive">
                            <table className="order-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Code</th>
                                        <th>Quantity</th>
                                        <th>Action</th>
                                        <th><Trash2 size={16} /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="total-row">
                                        <td colSpan="2">Total</td>
                                        <td>0</td>
                                        <td></td>
                                        <td><Trash2 size={16} style={{ opacity: 0.3 }} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Note Section */}
                    <div className="form-group mb-30">
                        <label className="section-label">Note</label>
                        <textarea 
                            rows="4" 
                            placeholder="Add adjustment note..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Submit Bar */}
                    <div className="submit-section">
                        <button type="submit" className="submit-btn">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAdjustment;
