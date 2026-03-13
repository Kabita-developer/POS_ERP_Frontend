import React, { useState, useEffect } from 'react';
import './ImportCategoryModal.css';
import { X, Info, Download, Upload, AlertCircle } from 'lucide-react';

const ImportCategoryModal = ({ isOpen, onClose }) => {
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
        console.log('Importing categories from file...');
        onClose();
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
            <div 
                className={`modal-content import-category-modal ${isOpen ? 'slide-up' : ''}`} 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h2 className="modal-title">Import Category</h2>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="info-messages">
                        <div className="required-info">
                            <Info size={14} className="info-icon" />
                            <span>The field labels marked with * are required input fields.</span>
                        </div>
                        <div className="instruction-box">
                            <AlertCircle size={14} className="alert-icon" />
                            <span>The correct column order is <strong>(name*, parent_category)</strong> and you must follow this.</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="import-category-form">
                        <div className="import-grid">
                            <div className="form-group">
                                <label>Upload CSV File *</label>
                                <div className="custom-file-upload">
                                    <label htmlFor="csv-upload" className="file-label">
                                        <div className="choose-btn">Choose File</div>
                                        <span className="file-name">{fileName}</span>
                                    </label>
                                    <input 
                                        type="file" 
                                        id="csv-upload" 
                                        accept=".csv"
                                        onChange={handleFileChange}
                                        hidden
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Sample File</label>
                                <button type="button" className="btn-download-sample">
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

export default ImportCategoryModal;
