import React, { useState } from 'react';
import { X, Download } from 'lucide-react';
import './ImportExpenseCategoryModal.css';

function ImportExpenseCategoryModal({ onClose, onSubmit }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      // In a real application, you would parse the CSV here
      onSubmit(selectedFile);
    }
  };

  return (
    <div className="ec-modal-overlay fade-in">
      <div className="ec-modal-container slide-down import-modal-size">
        <div className="ec-modal-header">
          <h3 className="ec-modal-title">Import Expense Category</h3>
          <button className="ec-modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="ec-modal-body">
          <p className="ec-form-info">The field labels marked with * are required input fields.</p>
          <p className="ec-form-note">The correct column order is (code*, name*) and you must follow this.</p>
          
          <div className="import-grid">
            <div className="ec-form-group">
              <label className="ec-form-label">Upload CSV File <span className="req-star">*</span></label>
              
              <div className="modern-file-upload">
                <input 
                  type="file" 
                  id="csv-upload" 
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden-file-input"
                  required
                />
                <label htmlFor="csv-upload" className="file-upload-label">
                  <span className="file-upload-btn">Choose File</span>
                  <span className="file-upload-text">
                    {selectedFile ? selectedFile.name : 'No file chosen'}
                  </span>
                </label>
              </div>
            </div>
            
            <div className="ec-form-group">
              <label className="ec-form-label">Sample File</label>
              <button type="button" className="btn-modern btn-teal download-sample-btn">
                <Download size={16} /> Download
              </button>
            </div>
          </div>
          
          <div className="ec-modal-footer">
            <button type="submit" className="ec-btn-submit" disabled={!selectedFile}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ImportExpenseCategoryModal;
