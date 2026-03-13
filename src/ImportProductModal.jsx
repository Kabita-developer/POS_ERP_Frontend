import React, { useState, useEffect } from 'react';
import './ImportProductModal.css';
import { X, Info, Upload, Download, FileSpreadsheet } from 'lucide-react';

const ImportProductModal = ({ isOpen, onClose }) => {
    const [fileName, setFileName] = useState('No file chosen');
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen && !isAnimating) return null;

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('No file chosen');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Importing Products...');
        onClose();
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
            <div 
                className={`modal-content import-product-premium-modal ${isOpen ? 'slide-up' : ''}`} 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <div className="title-with-icon">
                        <FileSpreadsheet className="header-icon" size={22} />
                        <h2 className="modal-title">Import Product</h2>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="required-info-notice">
                        <Info size={14} className="info-icon" />
                        <span>The field labels marked with * are required input fields.</span>
                    </div>

                    <div className="instruction-card">
                        <p className="instruction-main">
                            The correct column order is <strong>(image, name*, code*, type*, brand, category*, unit_code*, cost*, price*, product_details, variant_name, item_code, additional_price)</strong> and you must follow this.
                        </p>
                        <div className="instruction-sub">
                            <Info size={12} />
                            <span>To display Image it must be stored in <code>public/images/product</code> directory. Image name must be same as product name.</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="import-form">
                        <div className="import-grid">
                            <div className="form-group">
                                <label>Upload CSV File *</label>
                                <div className="custom-file-upload">
                                    <input 
                                        type="file" 
                                        id="csv-upload" 
                                        accept=".csv" 
                                        onChange={handleFileChange} 
                                        hidden 
                                    />
                                    <label htmlFor="csv-upload" className="file-label">
                                        <div className="choose-btn">Choose File</div>
                                        <span className="file-name">{fileName}</span>
                                    </label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Sample File</label>
                                <button type="button" className="download-sample-btn">
                                    <Download size={18} />
                                    <span>Download</span>
                                </button>
                            </div>
                        </div>

                        <div className="form-footer">
                            <button type="submit" className="submit-btn">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ImportProductModal;
